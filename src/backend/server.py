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

# ==========================================================================================
# Backend Functionality Testing
# ==========================================================================================

# 1. Example route to test frontend/backend communication 
# NOTE: (To test, you need to include frontend -> pages ->Profile in frontend -> App.js )
@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

# 2. Example backend route to test database connection
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
            
            cursor.execute(sql, (course_code))
            results = cursor.fetchall()
            return jsonify(results)
    except Exception as e:
        print('Error:', e)
        return jsonify({'error': str(e)})

# 3. Test database connection using a testing endpoint
def get_db_connection():
    try:
        return mysql.connector.connect(
            host="localhost",
            user="root",
            password="kim760128",
            database="StudyGroup"
        )
    except mysql.connector.Error as err:
        print(f"Database connection error: {err}")
        return None

# 4. Secondary test for database connection via a simple query
def test_db_connection():
    try:
        connection = get_db_connection()
        if connection is None:
            return jsonify({"success": False, "message": "Database connection failed."})
        cursor = connection.cursor()
        cursor.execute("SELECT 1")
        cursor.close()
        connection.close()
        return jsonify({"success": True, "message": "Database connection is successful."})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

# ==========================================================================================
# SEARCH
# ==========================================================================================

@app.route('/api/search', methods=['GET'])
def search_groups():
   try:
       # Extract the user ID from the Authorization header
    #    auth_header = request.headers.get('Authorization')
    #    if not auth_header or not auth_header.startswith('Bearer '):
    #        return jsonify({"success": False, "message": "Missing or invalid user ID."}), 401

    #    user_id = auth_header.split(' ')[1]
       user_id = "1"

       # Extract search parameters from the request body
    #    data = request.json
    #    print("Data received from frontend:", data)

    #    department = data.get('department')
    #    course_code = data.get('course_code')

       
       with db.cursor(dictionary=True) as cursor:
           department = request.args.get('department')
           course_code = request.args.get('course_code')

           print("Received parameters:")
           print(f"Department: {department}")
           print(f"Course Code: {course_code}")


           sql = '''
               SELECT g.group_id, g.group_name, g.study_type, c.course_code, c.department,
                      c.course_name, COUNT(m.user_id) as groupSize,
                      EXISTS(SELECT 1 FROM membership WHERE membership.group_id = g.group_id
                             AND membership.user_id = %s) as isMember
               FROM studygroup AS g
               JOIN group_courses AS gc ON g.group_id = gc.group_id
               JOIN courses AS c ON gc.CRN = c.CRN
               LEFT JOIN membership AS m ON g.group_id = m.group_id
               WHERE (%s IS NULL OR c.department = %s)
                 AND (%s IS NULL OR c.course_code = %s)
               GROUP BY g.group_id, g.group_name, g.study_type, c.course_code, c.department, c.course_name
           '''
           cursor.execute(sql, (user_id, department, department, course_code, course_code))
           groups = cursor.fetchall()

       return jsonify({"success": True, "groups": groups})
   except Exception as e:
       print('Error:', e)
       return jsonify({"success": False, "message": str(e)})

# ==========================================================================================
# MY GROUPS
# ==========================================================================================

@app.route('/api/groups/<group_id>/join', methods=['POST'])
def join_group(group_id):
    try:
        data = request.json
        user_id = data.get('user_id')

        with db.cursor() as cursor:
            # Check if the user is already a member
            cursor.execute("SELECT * FROM membership WHERE group_id = %s AND user_id = %s", (group_id, user_id))
            if cursor.fetchone():
                return jsonify({"success": False, "message": "You are already a member of this group."})

            # Add the user to the group
            cursor.execute("INSERT INTO membership (group_id, user_id) VALUES (%s, %s)", (group_id, user_id))
            db.commit()
            return jsonify({"success": True, "message": "Successfully joined the group."})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

# ==========================================================================================
# LOGIN
# ==========================================================================================

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
                return jsonify({
                    "success": True,
                    "message": "Login successful!",
                    "user_id": user['id'],
                    "email": user['email'] 
                })
            else:
                return jsonify({"success": False, "message": "Invalid email or password."}), 401
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

# EDIT PROFILE - Profile
@app.route('/api/profile/editprofile', methods=['POST'])
def edit_user_profile():
    try:
        # Extract args
        data = request.json
        user_id = data.get('user_id')
        email = data.get('email')
        password = data.get('password')
        study_pref = data.get('study_pref')
            
        with db.cursor() as cursor:
            # Init Sql statement
            conditions = []
            cond_values = []
            sql = '''UPDATE Users SET '''
            
            # Add filters dynamically
            if email:
                conditions.append("email = %s")
                cond_values.append(email)
            if password:
                conditions.append("password = %s")
                cond_values.append(password)
            if study_pref:
                conditions.append("study_pref = %s")
                cond_values.append(study_pref)

            # Append conditions to SQL
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

# ADD CONTACT - Profile
@app.route('/api/profile/addcontact', methods=['POST'])
def add_user_contact():
    try:
        # Extract args
        data = request.json
        user_id = data.get('user_id')
        contact_name = data.get('contact_name')
        username = data.get('username')

        with db.cursor() as cursor:
            # Execute sql - insert user_contact row
            # Get platform contact id here
            sql = '''
                SELECT contact_id
                FROM Contacts
                WHERE contact_name = %s
                LIMIT 1
            '''
            cursor.execute(sql, (contact_name,))
            result = cursor.fetchone()
            contact_id = result[0]

            # Given contact Id, make a new user_contact
            sql = '''INSERT INTO User_Contact (contact_id, user_id, username)
            VALUES (%s, %s, %s)'''
            cursor.execute(sql, (contact_id, user_id, username)) # NOTE: CHANGE THIS LATER
            db.commit()
            
            return jsonify({"success": True})
    except Exception as e:
        print('Error:', e)
        return jsonify({'error': str(e)})
    
# DELETE CONTACT - Profile
@app.route('/api/profile/removecontact', methods=['POST'])
def delete_user_contact():
    try:
        # Extract args
        data = request.json
        user_id = data.get('user_id')
        contact_name = data.get('contact_name')
        username = data.get('username')
        with db.cursor() as cursor:
            # Execute sql - delete contact row - and return results
            sql = '''DELETE FROM User_Contact
            USING User_Contact
            JOIN Contacts ON User_Contact.contact_id = Contacts.contact_id
            WHERE User_Contact.user_id = %s
            AND Contacts.contact_name = %s
            AND User_Contact.username = %s'''
            cursor.execute(sql, (user_id, contact_name, username))
            db.commit()
            return jsonify({"success": True})
    except Exception as e:
        print('Error:', e)
        return jsonify({'error': str(e)})

# GET CONTACTS - Profile
@app.route('/api/profile/getcontacts', methods=['GET'])
def get_contacts():
    try:
        # Extract args
        with db.cursor(dictionary=True) as cursor:
            user_id = request.args.get('user_id')

            # Execute sql - delete contact row - and return results
            sql = '''SELECT Contacts.contact_name, User_Contact.username
            FROM User_Contact
            JOIN Contacts ON User_Contact.contact_id = Contacts.contact_id
            WHERE User_Contact.user_id = %s'''
            cursor.execute(sql, (user_id,))
            results = cursor.fetchall()

            # Retrieve contents and return success
            return jsonify(results)
    except Exception as e:
        print('Error:', e)
        return jsonify({'error': str(e)})

    
if __name__ == "__main__":
    app.run(port=5000, debug=True) # Sets development mode
