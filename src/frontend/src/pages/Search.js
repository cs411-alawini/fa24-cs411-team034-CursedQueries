import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../App.css";
import Axios from "axios";
import TimeWidget from "../components/TimeWidget"; // Adjust the path as needed
import { useUserContext } from '../context/UserContext';


const Search = () => {
 const [isWidgetOpen, setIsWidgetOpen] = useState(false);
 const [groups, setGroups] = useState([]);
 const [department, setDepartment] = useState("");
 const [courseCode, setCourseCode] = useState("");
 const [selectedTimes, setSelectedTimes] = useState([]);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");
 const { userId } = useUserContext(); // To get user ID from context


 // Fetch groups from the backend
 const fetchGroups = async () => {
  setLoading(true);
  try {
    const params = new URLSearchParams();
    if (department) params.append("department", department);
    if (courseCode) params.append("course_code", courseCode);
    if (selectedTimes.length > 0) params.append("meeting_times", selectedTimes.join(","));
    
    const response = await Axios.get(
      `http://localhost:5000/api/search?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      }
    );

    console.log("Backend Response:", response.data);

    if (response.data.success) {
      setGroups(response.data.groups || []);
      setError("");
    } else {
      setGroups([]);
      setError(response.data.message || "Error fetching groups.");
    }
  } catch (err) {
    console.error("Error fetching groups:", err);
    setError("Error fetching groups. Please try again.");
    setGroups([]);
  } finally {
    setLoading(false);
  }
};

 // Toggle the time slots in the time widget
 const toggleTimeSlot = (day, timeSlot) => {
   const timeKey = `${day}-${timeSlot}`;
   setSelectedTimes((prev) =>
     prev.includes(timeKey)
       ? prev.filter((t) => t !== timeKey)
       : [...prev, timeKey]
   );
 };

 // Clear all filters
 const clearFilters = () => {
   setDepartment("");
   setCourseCode("");
   setSelectedTimes([]);
   setGroups([]);
 };

 // Join a study group
 const handleJoinGroup = async (groupId) => {
   if (!userId) {
     alert("You must be logged in to join a group.");
     return;
   }

   try {
     const response = await Axios.post(`http://localhost:5000/api/groups/${groupId}/join`, {
       user_id: userId,
     });

     if (response.data.success) {
       alert("Successfully joined the group.");
       fetchGroups(); // Refresh the list of groups after joining
     } else {
       alert(response.data.message);
     }
   } catch (error) {
     console.error("Error joining group:", error);
     alert("Error joining group. Please try again.");
   }
 };

 return (
   <div className="search-page">
     <h1>Search Study Groups</h1>
     <p>Find the perfect study group by filtering below:</p>

     <div className="search-bar">
       <input
         type="text"
         placeholder="Filter by Department"
         value={department}
         onChange={(e) => setDepartment(e.target.value)}
       />
       <input
         type="text"
         placeholder="Filter by Course Code"
         value={courseCode}
         onChange={(e) => setCourseCode(e.target.value)}
       />
       <button onClick={() => setIsWidgetOpen(true)}>Filter by Meeting Time</button>
       <button onClick={fetchGroups}>Search</button>
       <button onClick={clearFilters}>Clear Filters</button>
     </div>

     {isWidgetOpen && (
       <TimeWidget
         toggleTimeSlot={toggleTimeSlot}
         clearFilters={clearFilters}
         closeWidget={() => setIsWidgetOpen(false)}
         selectedTimes={selectedTimes}
       />
     )}

     <div className="group-results">
       {loading && <p>Loading...</p>}
       {error && <p>{error}</p>}
       {groups.map((group) => (
         <div key={group.group_id} className="group-card">
           <h3>{group.group_name}</h3>
           <p>Course Code: {group.course_code}</p>
           <p>Department: {group.department}</p>
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