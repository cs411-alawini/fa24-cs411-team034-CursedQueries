import React, { useState } from "react";

function GroupCreation() {
  const [course, setCourse] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ course, description, size });
    alert("Group created!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a Study Group</h2>
      <input
        type="text"
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Group Size"
        value={size}
        onChange={(e) => setSize(e.target.value)}
        required
      />
      <button type="submit">Create</button>
    </form>
  );
}

export default GroupCreation;
