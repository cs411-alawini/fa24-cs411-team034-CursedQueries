import React, { useState } from 'react'
import '../App.css'; 

export default function Profile() {
  // States
  const [profile, setProfile] = useState('');
  const [password, setPassword] = useState('');
  const [studyPreference, setStudyPreference] = useState('');
  // Temporary - REMOVE AFTER BACKEND IMPLEMENTATION
  const [profile_database, setProfile_database] = useState('');
  const [password_database, setPassword_database] = useState('');
  const [studyPreference_database, setStudyPreference_database] = useState('');

  const [dropdownOption, setDropdownOption] = useState("");
  const [contactInfo, setContactInfo] = useState('');
  const [userContacts, setuserContacts] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');


  const handleLogin = () => {
    if (profile === profile_database && password === password_database) {
      setLoginMessage("Login successful!");
    } else {
      setLoginMessage("Invalid email or password.");
    }
  };
  const handleRegister = async () => {
    try {
      // Simulate API call or integrate your API logic here
      console.log(`Registering with: ${registerEmail}, ${registerPassword}`);
      setRegisterMessage('Account created successfully!');
    } catch (error) {
      setRegisterMessage('Error creating account. Please try again.');
    }
  };
  

  // Add Contact - Update button handler
  const updateProfile = () => {
    setProfile_database(profile);
    setPassword_database(password);
    setStudyPreference_database(studyPreference);
  };

  // Edit Contacts - dropdown handler
  const handleDropdownChange = (event) => {
    setDropdownOption(event.target.value);
  };

  // Edit Contacts - Add Contact button handler - Adds contact to list and clear output
  const addToContacts = () => {
    if (dropdownOption.trim() !== "" && contactInfo.trim() !== "") {
      const newContact = {
        platform: dropdownOption,
        contactInfo: contactInfo,
      };
      
      setuserContacts([...userContacts, newContact]);
      setDropdownOption(""); 
      setContactInfo(""); 
    }
  };
  
  // Edit Contacts - Remove Contact button handler
  const removeContact = () => {
    setuserContacts(userContacts.filter(
      userContact => userContact.platform !== dropdownOption && userContact.contactInfo !== contactInfo)
    );
  };

  return (
    <div className = "homepage" >
     {/* ============================ LOGIN ============================ */}
      <h1>Login</h1>
      <label htmlFor="emailLogin"> Email: </label>
      <input
        id="emailLogin"
        type="text"
        placeholder="Enter your email"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
      /> <br /><br />

      <label htmlFor="passwordLogin"> Password: </label>
      <input
        id="passwordLogin"
        type="password"
        placeholder="Enter your password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      /> <br /><br />

      <button 
        onClick={handleLogin} 
        style={{ marginBottom: "40px"}}
      >
        Login
      </button>
      <p>{loginMessage}</p>
      
      <hr /><br />
      {/* ============================ CREATE ACCOUNT ============================ */}
<h1>Create Account</h1>
<label htmlFor="emailRegister"> Email: </label>
<input
  id="emailRegister"
  type="text"
  placeholder="Enter your email"
  value={registerEmail}
  onChange={(e) => setRegisterEmail(e.target.value)}
/> <br /><br />

<label htmlFor="passwordRegister"> Password: </label>
<input
  id="passwordRegister"
  type="password"
  placeholder="Enter your password"
  value={registerPassword}
  onChange={(e) => setRegisterPassword(e.target.value)}
/> <br /><br />

<button 
  onClick={handleRegister} 
  style={{ marginBottom: "40px"}}
>
  Create Account
</button>
<p>{registerMessage}</p>

      <h1>Profile</h1> <hr/><br/>
      {/* ============================ EDIT PROFILE ============================ */}
      <h2>Edit Profile</h2><br/>
      
      {/* Set email */}
      <label htlmlFor="email"> Profile:{" "} </label>
      <input
        id="email"
        type="text"
        placeholder="Email"
        value={profile}
        onChange={(e) => setProfile(e.target.value)}
      /> 
      {" "}Current: {profile_database}
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
      {" "}Current: {password_database}
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
      {" "}Current: {studyPreference_database}
      <br/><br/><br/>
      
      <button onClick={updateProfile}>
        Update 
      </button> <br/><br/>

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