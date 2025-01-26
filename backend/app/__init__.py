from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')  # Load configuration settings

    CORS(app)

    db.init_app(app)  # Initialize SQLAlchemy with the app

    # Import your models here to ensure they are registered with SQLAlchemy
    with app.app_context():
        from . import models  # Ensure models are imported
        db.create_all()  # Create tables if they do not exist

    # Import and register blueprints
    from .routes.user_routes import user_routes as user_routes_bp
    app.register_blueprint(user_routes_bp)

    return app
