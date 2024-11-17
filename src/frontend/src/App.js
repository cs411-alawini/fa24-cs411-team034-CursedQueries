import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import './App.css'; 

import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";

// test data
const groups = [
  {
    name: "Math 101 Study Group",
    description: "A group for students taking Math 101.",
    courseCode: "MATH101",
    subject: "Mathematics",
    groupSize: 5,
    meetingTime: "Monday 5 PM"
  },
  {
    name: "CS 101 Study Group",
    description: "Group for CS 101 assignments and exam prep.",
    courseCode: "CS101",
    subject: "Computer Science",
    groupSize: 4,
    meetingTime: "Tuesday 3 PM"
  },
  {
    name: "History 101 Study Group",
    description: "History 101 group discussions.",
    courseCode: "HIST101",
    subject: "History",
    groupSize: 3,
    meetingTime: "Wednesday 10 AM"
  }
];

const App = () => {
  return (
    <div className="App">
      <Homepage groups={groups} />
    </div>
  );
};

export default App;
