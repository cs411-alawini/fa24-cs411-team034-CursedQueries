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
  password="team034", 
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


if __name__ == "__main__":
    app.run(port=5000, debug=True) # Sets development mode
