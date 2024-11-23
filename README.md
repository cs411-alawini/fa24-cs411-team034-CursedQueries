# Quick Start 

### Note: The below commands are intended for Windows.

1) REQUIRED: Make sure Python3 and node.js are installed. If running locally, you need to implement and start up the Studygroup database in mysql.
   
2) To set up the backend, open a terminal instance in the project and go to src/backend. Execute the below commands.
   This creates, activates, and installs the required packages in a virtual environment.
    ``` 
    python -m venv venv
    .\venv\Scripts\activate
    pip install -r requirements.txt
    ```

3) To start up the backend, use the below command in the same terminal. If running locally, open http://localhost:5000 in your browser to debug.
    ``` 
    python server.py
    ```
   
4) To start up the frontend, open another terminal instance in the Project and go to  src/frontend. Execute the below commands. If running locally, open http://localhost:3000 in your browser to debug.
    ``` 
    npm install
    npm start
    ```