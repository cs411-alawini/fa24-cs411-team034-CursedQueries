import React from "react";

function GroupListings({ filters }) {
  const studyGroups = [
    { id: 1, courseCode: "CS101", subject: "Computer Science", description: "Intro to CS", size: 5, meetingTime: "Mon 6PM" },
    { id: 2, courseCode: "BIO200", subject: "Biology", description: "Cell Biology", size: 8, meetingTime: "Wed 4PM" },
  ];

  const filteredGroups = studyGroups.filter(
    (group) =>
      (!filters.courseCode || group.courseCode.includes(filters.courseCode)) &&
      (!filters.subject || group.subject.includes(filters.subject))
  );

  return (
    <div>
      <h2>Available Study Groups</h2>
      {filteredGroups.map((group) => (
        <div key={group.id}>
          <h3>{group.courseCode} - {group.subject}</h3>
          <p>{group.description}</p>
          <p>Group Size: {group.size}</p>
          <p>Meeting Time: {group.meetingTime}</p>
          <button>Request to Join</button>
        </div>
      ))}
    </div>
  );
}

export default GroupListings;
