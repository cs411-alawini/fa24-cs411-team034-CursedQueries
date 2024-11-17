import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import GroupListings from "./pages/GroupListings";
import GroupDashboard from "./pages/GroupDashboard";
import GroupCreation from "./pages/GroupCreation";
import Profile from "./pages/Profile";


function App() {
  const [filters, setFilters] = useState({});

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage setFilters={setFilters} />} />
        <Route path="/groups" element={<GroupListings filters={filters} />} />
        <Route path="/group" element={<GroupDashboard />} />
        <Route path="/create-group" element={<GroupCreation />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
