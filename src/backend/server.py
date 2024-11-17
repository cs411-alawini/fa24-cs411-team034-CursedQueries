from flask import Flask, jsonify, make_response, request
import mysql.connector

app = Flask(__name__)

'''
Project Setup: 
    1) Create a python venv. Activate it and pip install requirements.txt.
    2) Run server.py, then run npx App.py.
'''

# Members API Route
@app.route("/")
def index():
    return "List of Pages: /members"

# Members API Route
@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

if __name__ == "__main__":
    app.run(port=5000, debug=True) # Sets development mode
