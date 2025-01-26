from . import db

# Association table for the many-to-many relationship (friendship) between users
friendship_table = db.Table(
    'friendship',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('friend_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)

    # Many-to-many relationship for friendships
    friends = db.relationship(
        'User',
        secondary=friendship_table,
        primaryjoin=id == friendship_table.c.user_id,
        secondaryjoin=id == friendship_table.c.friend_id,
        backref="friend_of"
    )

    # One-to-one relationship with Schedule
    schedule = db.relationship('Schedule', uselist=False, back_populates='user')

class Schedule(db.Model):
    __tablename__ = 'schedules'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True)

    # One-to-one relationship with User
    user = db.relationship('User', back_populates='schedule')

    # Relationship with Course (weak entity)
    courses = db.relationship('Course', back_populates='schedule')

class Course(db.Model):
    __tablename__ = 'courses'
    name = db.Column(db.String, nullable=False)
    schedule_id = db.Column(db.Integer, db.ForeignKey('schedules.id'), nullable=False)

    # Composite primary key
    __table_args__ = (
        db.PrimaryKeyConstraint('name', 'schedule_id'),
    )

    # Relationship with Schedule
    schedule = db.relationship('Schedule', back_populates='courses')
