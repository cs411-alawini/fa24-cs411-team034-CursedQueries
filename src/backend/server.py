from flask import Flask, jsonify, make_response, request
import mysql.connector

# Init server + mysql connection
app = Flask(__name__)

# NOTE: CHANGE YOUR INSTANCE PASSWORD TO WORK
db = mysql.connector.connect(
  host="localhost",
  user="root",
  password="team034", 
  database="StudyGroup"
)

# 1. Example API Route to test database connection.
@app.route("/")
def index():
    try:
        with db.cursor(dictionary=True) as cursor:
            crn = ['300'] # request.args.get('CRN')
            sql = '''SELECT c.CRN, c.department, c.course_code, c.course_name, COUNT(g.group_id)
                    FROM studygroup AS g
                    JOIN group_courses AS gc
                    ON g.group_id = gc.group_id
                    JOIN courses AS c
                    ON gc.CRN = c.CRN
                    WHERE c.course_code = %s
                    GROUP BY c.CRN'''
            cursor.execute(sql, crn)
            results = cursor.fetchall()
            return jsonify(results)
    except Exception as e:
        print('Error:', e)
        return jsonify({'error': str(e)})

# 2. Example API Route to test frontend/backend. Currently testing in frontend - Profile page.
@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

# 3. API Toute to test 'Filter by Course Code' - SEARCH
@app.route('/api/search', methods=['GET'])
def filter_by_course_code():
    try:
        with db.cursor(dictionary=True) as cursor:
            crn = request.args.get('CRN')
            sql = '''SELECT c.CRN, c.department, c.course_code, c.course_name, COUNT(g.group_id)
                    FROM studygroup AS g
                    JOIN group_courses AS gc
                    ON g.group_id = gc.group_id
                    JOIN courses AS c
                    ON gc.CRN = c.CRN
                    WHERE c.course_code = %s
                    GROUP BY c.CRN'''
            cursor.execute(sql, crn)
            results = cursor.fetchall()
            return jsonify(results)
    except Exception as e:
        print('Error:', e)
        return jsonify({'error': str(e)})


if __name__ == "__main__":
    app.run(port=5000, debug=True) # Sets development mode
