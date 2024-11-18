import React, { useState } from 'react';
import '../App.css'; // Ensure CSS is linked correctly
import Axios from 'axios'

const Homepage = () => {
  // State to store filter values
  const [groups, setGroups] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [subject, setSubject] = useState('');
  const [meetingTime, setMeetingTime] = useState(''); // State for meeting time filter

  // Data to pass through backend request
  const data = {
    course_code: courseCode,
    department: subject,
    meeting_time: meetingTime
  };

  // Every time an input changes, filter out the groups
  const filterGroups = () => {
    Axios.get('http://localhost:5000/api/homepage', {
      params: data
    }).then(response => {
      setGroups(response.data);
    }).catch(error => {
      console.error(error);
    });
  };

  return (
    <div className="homepage">
      <h1>Welcome to the Study Group Platform</h1>
      <p>Find study groups and join a community of learners!</p>

      {/* Filters for course code, subject, and meeting time */}
      <div className="search-bar">
        {/* Course Code Filter */}
        <input
          type="text"
          placeholder="Filter by Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        />

        {/* Subject Filter */}
        <input
          type="text"
          placeholder="Filter by Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        {/* Meeting Time Filter */}
        <input
          type="text"
          placeholder="Filter by Meeting Time"
          value={meetingTime}
          onChange={(e) => setMeetingTime(e.target.value)}
        />
        <button onClick={filterGroups}>
          Search
        </button>
      </div>

      {/* Display filtered groups */}
      <h2>Available Study Groups:</h2>
      {groups.length > 0 ? (
        <ul>
          {groups.map((group, index) => (
            <li key={index}>
              <h3>{group.group_name}</h3>
              <p>Study Type: {group.study_type}</p>
              <p>Course Name: {group.course_name}</p>
              <p>CRN: {group.CRN}</p>
              <p>Group Size: {group.groupSize}</p>
              <p>Meeting Time: {group.meetingTime}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No study groups found for the given filters.</p>
      )}
    </div>
  );
};

export default Homepage;
