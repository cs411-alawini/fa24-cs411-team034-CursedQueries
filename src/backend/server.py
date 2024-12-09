from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
import mysql.connector

# Init server + enable cross-origin resource sharing for frontend
app = Flask(__name__)
CORS(app, resources={r'/api/*': {"origins": "http://localhost:3000"}})

# Init SQL server
# NOTE: CHANGE YOUR INSTANCE PASSWORD TO WORK
db = mysql.connector.connect(
  host="localhost",
  user="root",
  password="group034", 
  database="StudyGroup"
)

# 1. Example API Route to test frontend/backend 
# NOTE: (To test, you need to include frontend -> pages ->Profile in frontend -> App.js )
@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

# 2. Example API Route to test database connection.
@app.route("/api")
def index():
    try:
        with db.cursor(dictionary=True) as cursor:
            course_code = ['300']
            sql = '''SELECT c.CRN, c.department, c.course_code, c.course_name, COUNT(g.group_id)
                    FROM studygroup AS g
                    JOIN group_courses AS gc
                    ON g.group_id = gc.group_id
                    JOIN courses AS c
                    ON gc.CRN = c.CRN
                    WHERE c.course_code = %s
                    GROUP BY c.CRN'''
            cursor.execute(sql, (course_code,))
            results = cursor.fetchall()
            return jsonify(results)
    except Exception as e:
        print('Error:', e)
        return jsonify({'error': str(e)})


# 3. API Toute to test 'Filter by Course Code' - SEARCH
@app.route('/api/homepage', methods=['GET'])
def filter_by_course_code():
    try:
        with db.cursor(dictionary=True) as cursor:
            conditions = []
            cond_values = []
            
            # Extract args + init SQL
            course_code = request.args.get('course_code')
            department = request.args.get('department')
            sql = '''SELECT g.group_name, g.study_type, c.CRN, c.course_name, COUNT(g.group_id) as groupSize
            FROM studygroup AS g
            JOIN membership as m
            ON g.group_id = m.group_id
            JOIN group_courses AS gc
            ON g.group_id = gc.group_id
            JOIN courses AS c
            ON gc.CRN = c.CRN
            '''
            
            # Apply conditionals if present and conclude SQL 
            if course_code:
                conditions.append("c.course_code = %s")
                cond_values.append(course_code)
            if department:
                conditions.append("c.department = %s")
                cond_values.append(department)
            if conditions is not None:
                sql += "\nWHERE " + " AND ".join(conditions)

            sql += '''\nGROUP BY g.group_id, c.CRN
                    ORDER BY course_name '''
            
            # Execute sql and return results
            cursor.execute(sql, tuple(cond_values))
            results = cursor.fetchall()
            print('results:', jsonify(results))
            return jsonify(results)
    except Exception as e:
        print('Error:', e)
        return jsonify({'error': str(e)})

#add login endpoint to be compatible with frontend
@app.route('/api/homepage/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')

        with db.cursor(dictionary=True) as cursor:
            sql = "SELECT * FROM users WHERE email = %s AND password = %s"
            cursor.execute(sql, (email, password))
            user = cursor.fetchone()
            if user:
                return jsonify({"success": True, "message": "Login successful!"})
            else:
                return jsonify({"success": False, "message": "Invalid email or password."})
    except Exception as e:
        print('Error:', e)
        return jsonify({"success": False, "message": str(e)})

#add create-user endpoint for frontend
@app.route('/api/create-user', methods=['POST'])
def create_user():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')

        with db.cursor() as cursor:
            sql = "INSERT INTO users (email, password) VALUES (%s, %s)"
            cursor.execute(sql, (email, password))
            db.commit()
            return jsonify({"success": True, "message": "Account created successfully!"})
    except Exception as e:
        print('Error:', e)
        return jsonify({"success": False, "message": str(e)})

#fetch-user-groups
@app.route('/api/groups/user/<user_id>', methods=['GET'])
def get_user_groups(user_id):
    try:
        with db.cursor(dictionary=True) as cursor:
            sql = """SELECT * FROM groups 
                     JOIN membership ON groups.group_id = membership.group_id 
                     WHERE membership.user_id = %s"""
            cursor.execute(sql, (user_id,))
            results = cursor.fetchall()
            return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)})
    
#fetch-managed-groups
@app.route('/api/groups/managed/<user_id>', methods=['GET'])
def get_managed_groups(user_id):
    try:
        with db.cursor(dictionary=True) as cursor:
            sql = "SELECT * FROM groups WHERE manager_id = %s"
            cursor.execute(sql, (user_id,))
            results = cursor.fetchall()
            return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)})

# ==========================================================================================
# PROFILE 
# ==========================================================================================

# 4. API Route to test EDIT PROFILE - Profile
@app.route('/api/profile/editprofile', methods=['POST'])
def edit_user_profile():
    try:
        with db.cursor(dictionary=True) as cursor:
            conditions = []
            cond_values = []
            
            # Extract args + init SQL
            user_id = request.args.get('user_id')
            email = request.args.get('email')
            password = request.args.get('password')
            study_pref = request.args.get('study_pref')
            sql = '''UPDATE Users SET '''
            
            if email:
                conditions.append("email = %s")
                cond_values.append(email)
            if password:
                conditions.append("password = %s")
                cond_values.append(password)
            if study_pref:
                conditions.append("study_pref = %s")
                cond_values.append(study_pref)
            if conditions is not None:
                sql += ", ".join(conditions) + "\n WHERE user_id = %s"
                cond_values.append(user_id)

            # Execute sql and return results 
            cursor.execute(sql, tuple(cond_values))
            db.commit()
            return jsonify({"success": True})
    except Exception as e:
        print('Error:', e)
        return jsonify({'error': str(e)})

# 4. API Route to test ADD CONTACT - Profile
@app.route('/api/profile/addcontact', methods=['POST'])
def add_user_contact():
    try:
        with db.cursor(dictionary=True) as cursor:
            # Extract args + init SQL
            user_id = request.args.get('user_id')
            platform = request.args.get('platform')
            username = request.args.get('username')

            sql = '''INSERT INTO User_Contact (contact_id, user_id, username)
            VALUES (%s, %s, %s)'''
            cursor.execute(sql, ('1', user_id, username)) # NOTE: CHANGE THIS LATER

            sql = "INSERT INTO Contacts (contact_id, contact_name) VALUES (%s, %s)"
            cursor.execute(sql, ('1', platform)) # NOTE: CHANGE THIS LATER
            db.commit()
            return jsonify({"success": True, "message": "Account created successfully!"})
    except Exception as e:
        print('Error:', e)
        return jsonify({'error': str(e)})
    
# 4. API Route to test DELETE CONTACT - Profile
@app.route('/api/profile/removecontact', methods=['POST'])
def delete_user_contact():
    try:
        with db.cursor(dictionary=True) as cursor:
            # Extract args + init SQL
            user_id = request.args.get('user_id')
            platform = request.args.get('platform')
            username = request.args.get('username')

            sql = '''DELETE FROM User_Contact
            USING Contacts
            WHERE User_Contact.user_id = %s
            AND Contacts.contact_name = %s
            AND User_Contact.username = 'desired_username';'''

            cursor.execute(sql, (user_id, platform, username)) # NOTE: CHANGE THIS LATER
            db.commit()
            return jsonify({"success": True, "message": "Account created successfully!"})
    except Exception as e:
        print('Error:', e)
        return jsonify({'error': str(e)})


    
if __name__ == "__main__":
    app.run(port=5000, debug=True) # Sets development mode
