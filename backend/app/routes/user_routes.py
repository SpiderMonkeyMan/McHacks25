from flask import Blueprint, request, jsonify, redirect
from ..models import db, User
from ...methods import parse_site

# Create the blueprint
user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/check-username', methods=['POST'])
def check_username():
    data = request.get_json()
    username = data.get('username')

    if not username:
        return jsonify({"error": "Username is required"}), 400

    # Check if the username exists in the database
    user = User.query.filter_by(username=username).first()

    if not user:
        # If the user does not exist, add to the database
        new_user = User(username=username)
        db.session.add(new_user)
        db.session.commit()

        # Redirect to the page that asks for the link
        return jsonify({
            "schedule": False
        })

    # If the user exists, check for an attached schedule
    schedule = Schedule.query.filter_by(user_id=user.id).first()

    if not schedule:
        # If no schedule is attached, redirect to the link request page
        return jsonify({
            "schedule": False
        })

    # Fetch all courses linked to the schedule
    courses = schedule.courses

    # Serialize course data
    course_data = [
        {
            "name": course.name,
            "start_time": course.start_time,
            "length": course.length,
            "days": course.days_list  # Assuming days_list property is implemented in the Course model
        }
        for course in courses
    ]

    return jsonify({
        "schedule": True
        "schedule_id": schedule.id,
        "courses": course_data
    })


@user_routes.route('/process-schedule', methods=['POST'])
def create_schedule();
    data = request.json
    sched = parse_site(data['link'])
    add_schedule_to_user(data['username'], sched)

    return jsonify(sched)

def add_schedule_to_user(username, schedule_data):
    """
    Adds a schedule and its courses to the database for a given username.

    :param username: The username to associate the schedule with.
    :param schedule_data: Dictionary of courses with their details.
    :return: Success message or error.
    """
    # Find or create the user
    user = User.query.filter_by(username=username).first()
    if not user:
        user = User(username=username)
        db.session.add(user)
        db.session.commit()

    # Check if the user already has a schedule
    if Schedule.query.filter_by(user_id=user.id).first():
        return {"error": "User already has a schedule."}, 400

    # Create a new schedule
    new_schedule = Schedule(user_id=user.id)
    db.session.add(new_schedule)
    db.session.commit()

    # Add courses to the schedule
    for course_name, course_details in schedule_data.items():
        new_course = Course(
            name=course_name,
            schedule_id=new_schedule.id,
            start_time=course_details['starttime'],
            length=course_details['length'],
        )
        new_course.days_list = course_details['days']  # Assuming days_list property is implemented
        db.session.add(new_course)

    # Commit all changes to the database
    db.session.commit()

    return {"message": "Schedule and courses added successfully."}, 200