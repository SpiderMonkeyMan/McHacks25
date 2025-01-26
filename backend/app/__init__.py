from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')  # Load configuration settings

    db.init_app(app)  # Initialize SQLAlchemy with the app

    # Import your models here to ensure they are registered with SQLAlchemy
    with app.app_context():
        from . import models  # Ensure models are imported
        db.create_all()  # Create tables if they do not exist

    # Import and register blueprints
    from .routes.user_routes import bp as user_routes_bp
    app.register_blueprint(user_routes_bp)

    return app
