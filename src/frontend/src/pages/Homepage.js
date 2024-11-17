import React from "react";

const Homepage = ({ members }) => {
  return (
    <div>
      <h1>Homepage</h1>
      <p>Search bar placeholder here.</p>

      <h2>Available Members:</h2>
      {members.length > 0 ? (
        <ul>
          {members.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      ) : (
        <p>Loading members...</p>
      )}
    </div>
  );
};

export default Homepage;
