import React, { useState } from 'react'
import '../App.css'; 
import Axios from 'axios'

export default function Profile() {
  // States - EDIT PROFILE
  const [userId] = useState('1');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studyPreference, setStudyPreference] = useState('');
  const [profileMsg, setProfileMsg] = useState('');

  const [email_database, setEmail_database] = useState('');
  const [password_database, setPassword_database] = useState('');
  const [studyPreference_database, setStudyPreference_database] = useState('');

  // States - EDIT CONTACTS
  const [dropdownOption, setDropdownOption] = useState("");
  const [contactInfo, setContactInfo] = useState('');
  const [userContacts, setuserContacts] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  /* ============================ HANDLERS: EDIT PROFILE ============================ */
  const updateProfile = async () => {

    const userinfo = {
      user_id: userId,
      email: email,
      password: password,
      study_pref: studyPreference
    };

    try {
      const response = await Axios.post('http://localhost:5000/api/profile/editprofile', {
        user_id: userId,
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
    if (dropdownOption.trim() !== "" && contactInfo.trim() !== "") {
      const newContact = {
        user_id: userId,
        platform: dropdownOption,
        contactInfo: contactInfo,
      };
      
      try {
        const response = await Axios.post('http://localhost:5000/api/profile/addcontact', {
          params: newContact
        });
        if (response.data.success) {
          setContactMsg('Add successful.');
          // Update contacts and clear the feed
          setuserContacts([...userContacts, newContact]);
          setDropdownOption(""); 
          setContactInfo(""); 
        } else {
          setContactMsg('Invalid Contact Parameters.');
        }
      } catch (error) {
        console.error(error);
        setContactMsg('Error while adding contact. Try Again.');
      } 
    }
  };
  
  // Edit Contacts - Remove Contact button handler
  const removeContact = async () => {
    const deleteContact = {
      user_id: userId,
      platform: dropdownOption,
      contactInfo: contactInfo,
    };

    try {
      const response = await Axios.post('http://localhost:5000/api/profile/removecontact', {
        params: deleteContact
      });
      if (response.data.success) {
        setContactMsg('Delete successful.');
        setuserContacts(userContacts.filter(
          userContact => userContact.platform !== dropdownOption && userContact.contactInfo !== contactInfo)
        );
      } else {
        setContactMsg('Invalid Contact Parameters.');
      }
    } catch (error) {
      console.error(error);
      setContactMsg('Error while deleting contact. Try Again.');
    } 
  };

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
          <option value="Snapchat">Snapchat</option>
          <option value="Discord">Discord</option>
          <option value="GroupMe">GroupMe</option>
          <option value="Slack">Slack</option>
          <option value="Other">Other</option>
        </select><br/><br/>
        
        {/* Contact Info */}
        <label htlmlFor="contactInfo"> {" "}Contact Info:{" "} </label> 
        <input
          id="contactInfo"
          type="text"
          placeholder="Contact Info"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        /><br/><br/>{"  "}

        <button onClick={addToContacts}>
          Add 
        </button>{" "}

        <button onClick={removeContact}>
          Remove 
        </button>
        <p>{contactMsg}</p>
        <div><br/><br/></div>
      
      {/* Display/Remove Contacts */}
      <h3>Current Contacts:</h3>
      {userContacts.length > 0 ? (
        <ul>
          {userContacts.map((contact, index) => (
            <li key={index}>
              <h3>{contact.platform}: {contact.contactInfo}</h3>
            </li>
          ))}
        </ul>
      ) : (
        <p>None</p>
      )}

    </div>
  );
}