import React, { useState } from "react";
import PropTypes from "prop-types";
import "../App.css";
import TimeWidget from "../components/TimeWidget"; // Adjust the path as needed

const Search = () => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [groups, setGroups] = useState([
    {
      id: "1",
      name: "Math Study Group",
      courseCode: "MATH101",
      subject: "Mathematics",
      members: ["user123", "user456"],
    },
    {
      id: "2",
      name: "CS Study Group",
      courseCode: "CS101",
      subject: "Computer Science",
      members: ["user789"],
    },
  ]); // Replace with API data
  const [currentUser] = useState("user123"); // Replace with authentication logic

  const toggleTimeSlot = (day, time) => {
    console.log(`Toggled ${time} on ${day}`);
  };

  const clearFilters = () => {
    console.log("Cleared filters");
  };

  const handleJoinGroup = (groupId) => {
    const group = groups.find((g) => g.id === groupId);
    if (!currentUser) {
      alert("You must be logged in to join a group.");
      return;
    }

    if (group.members.includes(currentUser)) {
      alert("You are already part of this group.");
      return;
    }

    // Update group members (Replace this with an API call)
    const updatedGroups = groups.map((g) =>
      g.id === groupId
        ? { ...g, members: [...g.members, currentUser] }
        : g
    );
    setGroups(updatedGroups);
    alert(`Successfully joined the group: ${group.name}`);
  };

  return (
    <div className="search-page">
      <h1>Search Study Groups</h1>
      <p>Find the perfect study group by filtering below:</p>

      <div className="search-bar">
        <input type="text" placeholder="Filter by Course Code" />
        <input type="text" placeholder="Filter by Subject" />
        <button onClick={() => setIsWidgetOpen(true)}>Filter by Meeting Time</button>
      </div>

      {isWidgetOpen && (
        <TimeWidget
          toggleTimeSlot={toggleTimeSlot}
          clearFilters={clearFilters}
          closeWidget={() => setIsWidgetOpen(false)}
        />
      )}

      {/* Display Group Results */}
      <div className="group-results">
        {groups.map((group) => (
          <div key={group.id} className="group-card">
            <h3>{group.name}</h3>
            <p>Course Code: {group.courseCode}</p>
            <p>Subject: {group.subject}</p>
            <button onClick={() => handleJoinGroup(group.id)}>Join Group</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;