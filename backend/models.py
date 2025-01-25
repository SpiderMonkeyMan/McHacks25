from database import db

class User(db.Model):
    username = db.Column(db.String(100), primary_key=True, unique=True, nullable=False)
    scheduleNumber = db.Column(db.Integer)

    def __repr__(self):
        return f"<User {self.username}, Schedule #{self.scheduleNumber}>"