import React, { useState } from 'react';
import '../App.css'; // Ensure CSS is linked correctly

const Homepage = ({ groups }) => {
  // State to store filter values
  const [courseCode, setCourseCode] = useState('');
  const [subject, setSubject] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter groups based on search term, course code, and subject
  const filteredGroups = groups.filter(group => {
    return (
      group.courseCode.toLowerCase().includes(courseCode.toLowerCase()) &&
      group.subject.toLowerCase().includes(subject.toLowerCase()) &&
      (group.name.toLowerCase().includes(searchTerm.toLowerCase()) || group.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="homepage">
      <h1>Welcome to the Study Group Platform</h1>
      <p>Find study groups and join a community of learners!</p>

      {/* Filters for course code, subject, and search term */}
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

        {/* Search Term Filter */}
        <input
          type="text"
          placeholder="Search by Study Group Name or Description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
