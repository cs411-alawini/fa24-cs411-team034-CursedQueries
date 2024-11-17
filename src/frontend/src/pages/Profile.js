import React, { useEffect, useState } from 'react'

export default function Profile() {
  
  /* Test Backend */
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/members").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])
    
  return (
    <div>
      <header>
        <h1>Profile</h1>
      </header>
      <main>
        {(typeof backendData.members === 'undefined') ? (
          <p>Loading...</p>
          ) : (
          backendData.members.map((member, i) =>(
            <p key={i}>{member}</p>  
          ))  
        )}
      </main>
    </div>
  );
}