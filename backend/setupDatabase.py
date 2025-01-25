from server import app, db  # Import your app and db instances

with app.app_context():
    db.create_all()
    print("Database tables created!")