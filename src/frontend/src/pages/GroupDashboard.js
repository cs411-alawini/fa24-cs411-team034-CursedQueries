import React from "react";

function GroupDashboard() {
  const group = {
    title: "CS101 Study Group",
    description: "A group for CS101 students to collaborate.",
    members: ["Alice", "Bob", "Charlie"],
  };

  return (
    <div>
      <h1>{group.title}</h1>
      <p>{group.description}</p>
      <h3>Members:</h3>
      <ul>
        {group.members.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
    </div>
  );
}

export default GroupDashboard;
