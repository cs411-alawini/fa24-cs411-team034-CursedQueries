import React, { useState } from 'react';
import '../App.css'; // Ensure CSS is linked correctly

const Homepage = ({ groups }) => {
  // State to store filter values
  const [courseCode, setCourseCode] = useState('');
  const [subject, setSubject] = useState('');
  const [meetingTime, setMeetingTime] = useState(''); // State for meeting time filter

  // Filter groups based on course code, subject, and meeting time
  const filteredGroups = groups.filter(group => {
    return (
      group.courseCode.toLowerCase().includes(courseCode.toLowerCase()) &&
      group.subject.toLowerCase().includes(subject.toLowerCase()) &&
      group.meetingTime.toLowerCase().includes(meetingTime.toLowerCase()) // Meeting time filter
    );
  });

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
      </div>

      {/* Display filtered groups */}
      <h2>Available Study Groups:</h2>
      {filteredGroups.length > 0 ? (
        <ul>
          {filteredGroups.map((group, index) => (
            <li key={index}>
              <h3>{group.name}</h3>
              <p>{group.description}</p>
              <p>Course Code: {group.courseCode}</p>
              <p>Subject: {group.subject}</p>
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
