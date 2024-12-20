import React, { useState } from 'react'
import '../App.css'; 
import Axios from 'axios'
import { useUserContext } from '../context/UserContext'; 

export default function Profile() {
  // States - EDIT PROFILE
  // const [userId] = useState('1');
  const { user, setUser } = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studyPreference, setStudyPreference] = useState('');
  const [profileMsg, setProfileMsg] = useState('');

  const [email_database, setEmail_database] = useState('');
  const [password_database, setPassword_database] = useState('');
  const [studyPreference_database, setStudyPreference_database] = useState('');

  // States - EDIT CONTACTS
  const [dropdownOption, setDropdownOption] = useState("");
  const [username, setUsername] = useState('');
  const [userContacts, setuserContacts] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  /* ============================ HANDLERS: EDIT PROFILE ============================ */
  const updateProfile = async () => {
    try {
      const response = await Axios.post('http://localhost:5000/api/profile/editprofile', {
        user_id: user.user_id,
        email: email,
        password: password,
        study_pref: studyPreference
      });
      if (response.data.success) {
        setProfileMsg('Edit successful.');
        if (email !== null) setEmail_database(email); 
        if (password !== null) setPassword_database(password); 
        if (studyPreference !== null) setStudyPreference_database(studyPreference); 
      } else {
        setProfileMsg('Invalid edit parameters.');
      }
    } catch (error) {
      console.error(error);
      setProfileMsg('Error while editing parameters. Try Again.');
    }
  };


  /* ============================ HANDLERS: EDIT CONTACTS ============================ */
  // Edit Contacts - dropdown handler
  const handleDropdownChange = (event) => {
    setDropdownOption(event.target.value);
  };

  // Edit Contacts - Add Contact button handler - Adds contact to list and clear output
  const addToContacts = async () => {
    if (dropdownOption.trim() !== "" && username.trim() !== "") {
      try {
        const response = await Axios.post('http://localhost:5000/api/profile/addcontact', {
          user_id: user.user_id,
          contact_name: dropdownOption,
          username: username
        });
        if (response.data.success) {
          setContactMsg('Add successful.');
        } else {
          setContactMsg('Add unsuccesssful. Invalid Contact Parameters.');
        }
      } catch (error) {
        console.error(error);
        setContactMsg('Error while adding contact. Try Again.');
      } 
    }
    else{
      setContactMsg('Invalid Contact Parameters.');
    }
  };
  
  // Edit Contacts - Remove Contact button handler
  const removeContact = async () => {
    try {
      const response = await Axios.post('http://localhost:5000/api/profile/removecontact', {
        user_id: user.user_id,
        contact_name: dropdownOption,
        username: username
      });
      if (response.data.success) {
        setContactMsg('Delete successful.');
      } else {
        setContactMsg('Invalid Contact Parameters.');
      }
    } catch (error) {
      console.error(error);
      setContactMsg('Error while deleting contact. Try Again.');
    } 
  };

  // Edit Contacts - Get Contacts from user
  const fetchContacts = async () => {
    try {
      const response = await Axios.get('http://localhost:5000/api/profile/getcontacts', {
        params: {user_id: user.user_id}
      });

      // Validate response data
      if (Array.isArray(response.data)) {
        setuserContacts(response.data); // Update contacts state with the API response
      } else {
        console.error("API returned non-array response:", response.data);
        setuserContacts([]); // Set groups empty if the response is invalid
      }

    } catch (error) {
      console.error(error);
      setContactMsg('Error while retrieving contacts. Try Again.');
    } 
  }

  return (
    <div className = "homepage" >
      <h1>Profile</h1> <hr/><br/>
      {/* ============================ EDIT PROFILE ============================ */}
      <h2>Edit Profile</h2><br/>
      
      {/* Set email */}
      <label htlmlFor="email"> Email:{" "} </label>
      <input
        id="email"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /> 
      {" "}Set to: {email_database}
      <br/><br/>

      {/* Set Password */}
      <label htlmlFor="password"> Password:{" "} </label>
      <input
        id="password"
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /> 
      {" "}Set to: {password_database}
      <br/><br/>

      {/* Set Study Preference */}
      <label htlmlFor="studyPreference"> Study Preference:{" "} </label> 
      <input
        id="studyPreference"
        type="text"
        placeholder="Study Preference"
        value={studyPreference}
        onChange={(e) => setStudyPreference(e.target.value)}
      /> 
      {" "}Set to: {studyPreference_database}
      <br/><br/><br/>
      
      <button onClick={updateProfile}>
        Update 
      </button> <br/><br/>
      <p>{profileMsg}</p>

      <div><br/><hr/><br/></div>
      

      {/* ============================ EDIT CONTACTS ============================ */}
      <h2>Edit Contacts:</h2><br/>

      {/* Add Contact */}
      <h3>Add Contact:</h3><br/>
        {/* Dropdown */}
        <label htmlFor="options"> Platform:{" "} </label>
        <select
          id="options"
          value={dropdownOption}
          onChange={handleDropdownChange}
        >
          <option value="" disabled> Select an option </option>
          <option value="Email">Email</option>
          <option value="Phone Number">Phone Number</option>
          <option value="Snapchat">Snapchat</option>
          <option value="Instagram">Instagram</option>
          <option value="Discord">Discord</option>
          <option value="Slack">Slack</option>
          <option value="Groupme">Groupme</option>
          
        </select><br/><br/>
        
        {/* Contact Info */}
        <label htlmlFor="contactInfo"> {" "}Contact Info:{" "} </label> 
        <input
          id="contactInfo"
          type="text"
          placeholder="Contact Info"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br/><br/>{"  "}

        <button onClick={addToContacts}>
          Add 
        </button>{" "}

        <button onClick={removeContact}>
          Remove 
        </button>{" "}

        <button onClick={fetchContacts}>
          Show Contacts 
        </button><br/>
        <p>{contactMsg}</p>
        <div><br/><br/></div>
      
      {/* Display/Remove Contacts */}
      <h3>Current Contacts:</h3>
      {userContacts.length > 0 ? (
        <ul>
          {userContacts.map((contact, index) => (
            <li key={index}>
              <h3>{contact.contact_name}: {contact.username}</h3>
            </li>
          ))}
        </ul>
      ) : (
        <p>None</p>
      )}

    </div>
  );
}