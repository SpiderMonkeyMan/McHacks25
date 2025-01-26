from flask import Blueprint, request, jsonify, redirect
from ..models import db, User, Schedule, Course
from methods import parse_site

# Create the blueprint
user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/check-username', methods=['POST'])
def check_username():
    data = request.get_json()
    username = data.get('username')

    if not username:
        return jsonify({"error": "Username is required"}), 400

    # Check if the username exists in the database
    user = User.query.filter_by(name=username).first()

    if not user:
        # If the user does not exist, add to the database
        return jsonify({
            "schedule": False
        })

    # If the user exists, check for an attached schedule
    schedule = Schedule.query.filter_by(user_id=user.id).first()

    user_schedule_data = None
    if schedule:
        # Fetch all courses linked to the schedule
        courses = schedule.courses

        # Serialize course data
        user_courses = [
            {
                "name": course.name,
                "start_time": course.start_time,
                "length": course.length,
                "days": course.days_list  # Assuming days_list property is implemented in the Course model
            }
            for course in courses
        ]

    # Fetch friends of the user
    friends = user.friends

    # Fetch schedules and courses for each friend
    friends_data = []
    for friend in friends:
        friend_schedule = Schedule.query.filter_by(user_id=friend.id).first()
        if friend_schedule:
            friend_courses = friend_schedule.courses
            friends_data.append({
                "username": friend.name,
                "courses": [
                    {
                        "name": course.name,
                        "start_time": course.start_time,
                        "length": course.length,
                        "days": course.days_list  # Assuming days_list property is implemented in the Course model
                    }
                    for course in friend_courses
                ]
            })
        else:
            friends_data.append({
                "username": friend.name,
                "courses": None
            })

    return jsonify({
        "schedule": bool(schedule),
        "user_courses": user_courses,
        "friends": friends_data
    })


@user_routes.route('/process-schedule', methods=['POST'])
def create_schedule():
    data = request.json
    sched = parse_site(data['link'])
    add_schedule_to_user(data['username'], sched)

    return jsonify({"success": True,
                   "courses": sched})

def add_schedule_to_user(username, schedule_data):
    """
    Adds a schedule and its courses to the database for a given username.

    :param username: The username to associate the schedule with.
    :param schedule_data: Dictionary of courses with their details.
    :return: Success message or error.
    """
    # Find or create the user
    user = User.query.filter_by(name=username).first()
    if not user:
        user = User(name=username)
        db.session.add(user)
        db.session.commit()

    # Check if the user already has a schedule
    if Schedule.query.filter_by(user_id=user.id).first():
        return True

    # Create a new schedule
    new_schedule = Schedule(user_id=user.id)
    db.session.add(new_schedule)
    db.session.commit()

    # Add courses to the schedule
    for course_name, course_details in schedule_data.items():
        new_course = Course(
            name=course_name,
            schedule_id=new_schedule.id,
            start_time=course_details['start_time'],
            length=course_details['length'],
        )
        new_course.days_list = course_details['days']  # Assuming days_list property is implemented
        db.session.add(new_course)

    # Commit all changes to the database
    db.session.commit()

    return True

@user_routes.route('/add-friend', methods=['POST'])
def add_friend():
    data = request.get_json()
    user = data.get('user')  # First user
    friend = data.get('friend')  # Second user

    if not user or not friend:
        return jsonify({"error": "Both usernames are required"}), 400

    # Fetch the users from the database
    user1 = User.query.filter_by(name=user).first()
    user2 = User.query.filter_by(name=friend).first()

    if not user1 or not user2:
        return jsonify({"error": "One or both users do not exist"}), 404

    if user2 in user1.friends:
        return jsonify({"message": "These users are already friends"}), 200

    # Add the friend relationship
    user1.friends.append(user2)
    db.session.commit()

    # Fetch friend's schedule and courses
    friend_schedule = Schedule.query.filter_by(user_id=user2.id).first()
    friend_schedule_data = None
    if friend_schedule:
        friend_courses = friend_schedule.courses
        friend_schedule_data = {
            "username": friend,
            "courses": [
                {
                    "name": course.name,
                    "start_time": course.start_time,
                    "length": course.length,
                    "days": course.days_list  # Assuming days_list property is implemented
                }
                for course in friend_courses
            ]
        }

    return jsonify({
        "message": f"{user} and {friend} are now friends",
        "friend_courses": friend_schedule_data
    }), 201
