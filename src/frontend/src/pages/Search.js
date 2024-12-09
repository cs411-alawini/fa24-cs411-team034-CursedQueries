import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../App.css";
import Axios from "axios";
import TimeWidget from "../components/TimeWidget"; // Adjust the path as needed

const Search = () => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [groups, setGroups] = useState([]); // Groups fetched from backend
  const [courseCode, setCourseCode] = useState("");
  const [subject, setSubject] = useState("");
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [currentUser] = useState("user123"); // Replace with actual user ID logic
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const response = await Axios.get("http://localhost:5000/api/homepage", {
        params: {
          course_code: courseCode,
          department: subject,
          meeting_times: selectedTimes,
          user_id: currentUser, // Include current user ID
        },
      });
      setGroups(response.data);
      setError("");
    } catch (err) {
      setError("Error fetching groups. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleTimeSlot = (timeSlot) => {
    setSelectedTimes((prev) =>
      prev.includes(timeSlot) ? prev.filter((t) => t !== timeSlot) : [...prev, timeSlot]
    );
  };

  const clearFilters = () => {
    setCourseCode("");
    setSubject("");
    setSelectedTimes([]);
    fetchGroups();
  };

  const handleJoinGroup = async (groupId) => {
    if (!currentUser) {
      alert("You must be logged in to join a group.");
      return;
    }

    try {
      const response = await Axios.post(`http://localhost:5000/api/groups/${groupId}/join`, {
        user_id: currentUser,
      });

      if (response.data.success) {
        alert("Successfully joined the group.");
        fetchGroups(); // Refresh groups to update membership
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Error joining group. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="search-page">
      <h1>Search Study Groups</h1>
      <p>Find the perfect study group by filtering below:</p>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Filter by Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <button onClick={() => setIsWidgetOpen(true)}>Filter by Meeting Time</button>
      </div>

      {isWidgetOpen && (
        <TimeWidget
          toggleTimeSlot={toggleTimeSlot}
          clearFilters={clearFilters}
          closeWidget={() => setIsWidgetOpen(false)}
        />
      )}

      <div className="group-results">
        {groups.map((group) => (
          <div key={group.group_id} className="group-card">
            <h3>{group.group_name}</h3>
            <p>Course Code: {group.course_code}</p>
            <p>Subject: {group.department}</p>
            <p>Group Size: {group.groupSize}</p>
            {group.isMember ? (
              <p>You are already a member of this group.</p>
            ) : (
              <button onClick={() => handleJoinGroup(group.group_id)}>Join Group</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;