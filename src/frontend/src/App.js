import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Homepage from "./pages/Homepage";
import GroupListings from "./pages/GroupListings";
import GroupDashboard from "./pages/GroupDashboard";
import GroupCreation from "./pages/GroupCreation";
import Profile from "./pages/Profile";

const App = () => {
  const [members, setMembers] = useState([]);

  // fetch from flask backend
  useEffect(() => {
    fetch("http://127.0.0.1:5000/members")
      .then((response) => response.json())
      .then((data) => {
        setMembers(data.members);
      })
      .catch((error) => console.error("Error fetching members:", error));
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Homepage</Link>
          <Link to="/listings">Group Listings</Link>
          <Link to="/dashboard">Group Dashboard</Link>
          <Link to="/create">Create Group</Link>
          <Link to="/profile">Profile</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Homepage members={members} />} />
          <Route path="/listings" element={<GroupListings />} />
          <Route path="/dashboard" element={<GroupDashboard />} />
          <Route path="/create" element={<GroupCreation />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
