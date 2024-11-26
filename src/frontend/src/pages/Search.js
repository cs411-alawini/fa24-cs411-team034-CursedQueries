import React, { useState } from "react";
import PropTypes from "prop-types";
import "../App.css";
import TimeWidget from "../components/TimeWidget"; // Adjust the path as needed

const Search = () => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  const toggleTimeSlot = (day, time) => {
    console.log(`Toggled ${time} on ${day}`);
  };

  const clearFilters = () => {
    console.log("Cleared filters");
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
    </div>
  );
};

export default Search;