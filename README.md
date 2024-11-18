# Quick Start 

### Note: The below commands are intended for Windows.

1) REQUIRED: Make sure Python3 and node.js are installed. If running locally, you need to implement the Studygroup database in mysql.
   
2) Open a terminal instance in the Project. Go to use the below commands in src/backend.
   This creates, activates, and installs the required packages in a virtual environment.
    ``` 
    python -m venv venv
    .\venv\Scripts\activate
    pip install -r requirements.txt
    ```

3) Start up the backend using the below command. If running locally, open http://localhost:5000 in your browser.
    ``` 
    python server.py
    ```
   
4) To start up the frontend, open another terminal instance in the Project. Use the below command in src/frontend. If running locally, open http://localhost:3000 in your browser.
    ``` 
    npm start
    ```