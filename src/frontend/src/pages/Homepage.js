import React, { useState } from "react";

function Homepage({ setFilters }) {
  const [courseCode, setCourseCode] = useState("");
  const [subject, setSubject] = useState("");

  const handleSearch = () => {
    setFilters({ courseCode, subject });
  };

  return (
    <div>
      <h1>Study Group Finder</h1>
      <input
        type="text"
        placeholder="Course Code"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Homepage;
