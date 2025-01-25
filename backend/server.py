# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask, jsonify, request
from flask_cors import CORS
from methods import parse_site

from config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS
from database import db
from models import User

# Flask constructor takes the name of 
# current module (__name__) as argument.
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODIFICATIONS

CORS(app, resources={r"/*": {"origins": "*"}})

db.init_app(app)

# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.
@app.route('/schedule', methods=['GET'])
# ‘/’ URL is bound with hello_world() function.
def schedule():
    schedule = parse_site("https://vsb.mcgill.ca/vsb/criteria.jsp?access=0&lang=en&tip=1&page=results&scratch=0&term=202501&sort=none&filters=iiiiiiiii&bbs=&ds=&cams=Distance_Downtown_Macdonald_Off-Campus&locs=any&isrts=&course_0_0=ANAT-541&sa_0_0=&cs_0_0=--202501_997--&cpn_0_0=&csn_0_0=&ca_0_0=&dropdown_0_0=al&ig_0_0=0&rq_0_0=&course_1_0=ANAT-514&sa_1_0=&cs_1_0=--202501_995-996-&cpn_1_0=&csn_1_0=&ca_1_0=&dropdown_1_0=al&ig_1_0=0&rq_1_0=&course_2_0=CHEM-281&sa_2_0=&cs_2_0=--202501_1628--&cpn_2_0=&csn_2_0=&ca_2_0=&dropdown_2_0=al&ig_2_0=0&rq_2_0=&course_3_0=SOCI-309&sa_3_0=&cs_3_0=--202501_4807--&cpn_3_0=&csn_3_0=&ca_3_0=&dropdown_3_0=al&ig_3_0=0&rq_3_0=&course_4_0=GSFS-200&sa_4_0=&cs_4_0=--202501_2800-4983-&cpn_4_0=&csn_4_0=&ca_4_0=&dropdown_4_0=al&ig_4_0=0&rq_4_0=")

    return jsonify(schedule)

#get the data from the database
@app.route('/database', methods=['GET'])

def database():
    try:
        # Get the 'username' parameter from the request
        username = request.args.get('username')

        if not username:
            return jsonify({"error": "Username query parameter is required"}), 400

        # Query the database for the specific user
        user = User.query.filter_by(username=username).first()

        if not user:
            return jsonify({"error": f"User '{username}' not found"}), 404

        # Return the user's data as a JSON response
        user_data = {
            "username": user.username,
            "scheduleNumber": user.scheduleNumber
        }
        return jsonify(user_data), 200
    
    except Exception as e:
        # Handle any errors that may occur
        return jsonify({"error": str(e)}), 500

# main driver function
if __name__ == '__main__':

    # run() method of Flask class runs the application 
    # on the local development server.
    app.run(debug=True)