from flask import Blueprint, request, jsonify
from ..models import db, User

# Define the blueprint
bp = Blueprint('user_routes', __name__)

# Add the create_user route here
@bp.route('/users', methods=['POST'])
def create_user():
    data = request.json
    if 'name' not in data or not data['name']:
        return jsonify({'message': 'Name is required'}), 400
    new_user = User(name=data['name'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created', 'id': new_user.id}), 201
