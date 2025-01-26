from database import db

class User(db.Model):
    __tablename__ = 'users'
    username = db.Column(db.String(100), primary_key=True, unique=True, nullable=False)
    # Relationship to schedules
    schedules = db.relationship('Schedule', backref='user', lazy=True)

    def __repr__(self):
        return f"<User {self.username}>"

class Friendship(db.Model):
    __tablename__ = 'friendships'
    user_a = db.Column(db.String(100), db.ForeignKey('users.username'), nullable=False)
    user_b = db.Column(db.String(100), db.ForeignKey('users.username'), nullable=False)

    __table_args__ = (
        db.PrimaryKeyConstraint('user_a', 'user_b', name='friendship_pk'),
    )

    def __repr__(self):
        return f"<Friendship between {self.user_a} and {self.user_b}>"

class Schedule(db.Model):
    __tablename__ = 'schedule'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), db.ForeignKey('users.username'), nullable=False)

    def __repr__(self):
        return f"<Schedule {self.id} for {self.username}>"
    
class Course(db.Model):
    __tablename__ = "course"
    sch_id = db.Column(db.Integer, db.ForeignKey('schedule.id'))
    course_name = db.Column(db.String(100), nullable=False)
    days = db.Column(db.JSON, nullable=False)  # Storing days as a JSON array
    start_time = db.Column(db.Float, nullable=False)  # Represented as a float, e.g., 14.5 for 2:30 PM
    length = db.Column(db.Float, nullable=False)  # Length in hours

    __table_args__ = (
        db.PrimaryKeyConstraint('sch_id', 'course_name', name='course_pk'),
    )

    def __repr__(self):
        return f"<Course: {self.days}, {self.start_time}, {self.length}>"
