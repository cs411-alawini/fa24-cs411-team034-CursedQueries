import React, { useState, useEffect } from 'react';
import '../App.css';
import Axios from 'axios';

const user_id = "id123"

const MyGroups = () => {

    const [groups, setGroups] = useState([]);
    const [userGroups, setUserGroups] = useState([]);
    const [manageGroups, setManageGroups] = useState([]);
    const [createId, setCreateId] = useState([]);
    const [deleteId, setDeleteId] = useState([]);
    const [quitId, setQuitId] = useState([]);
    const [message, setMessage] = useState("")

    useEffect(() => {
        fetchGroups();
      }, []);
    
      const fetchGroups = async () => {
        try {
          const userGroupsResponse = await Axios.get(`http://localhost:5000/api/groups/user/${user_id}`);
          const manageGroupsResponse = await Axios.get(`http://localhost:5000/api/groups/managed/${user_id}`);
          setUserGroups(userGroupsResponse.data);
          setManageGroups(manageGroupsResponse.data);
        } catch (error) {
          console.error('Error fetching groups:', error);
        }
      };

    const handleDeleteChange = (event) => {
        setDeleteId(event.target.value);
    };

    const handleQuitChange = (event) => {
        setQuitId(event.target.value);
    };

    const createGroup = async () => {
        try {
          if (!createId.trim()) {
            setMessage('Group ID cannot be empty.');
            return;
          }
    
          const response = await Axios.post('http://localhost:5000/api/groups', {
            group_id: createId,
            manager_id: user_id,
          });
    
          if (response.data.success) {
            setMessage('Group created successfully.');
            fetchGroups();
          } else {
            setMessage(response.data.message || 'Error creating group.');
          }
        } catch (error) {
          console.error('Error creating group:', error);
          setMessage('Error creating group.');
        }
      };

      const deleteGroup = async () => {
        try {
          if (!deleteId) {
            setMessage('Please select a group to delete.');
            return;
          }
    
          const response = await Axios.delete(`http://localhost:5000/api/groups/${deleteId}`);
    
          if (response.data.success) {
            setMessage('Group deleted successfully.');
            fetchGroups();
          } else {
            setMessage(response.data.message || 'Error deleting group.');
          }
        } catch (error) {
          console.error('Error deleting group:', error);
          setMessage('Error deleting group.');
        }
      };
    

      const quitGroup = async () => {
        try {
          if (!quitId) {
            setMessage('Please select a group to quit.');
            return;
          }
    
          const response = await Axios.post(`http://localhost:5000/api/groups/${quitId}/quit`, {
            user_id,
          });
    
          if (response.data.success) {
            setMessage('Successfully quit the group.');
            fetchGroups();
          } else {
            setMessage(response.data.message || 'Error quitting group.');
          }
        } catch (error) {
          console.error('Error quitting group:', error);
          setMessage('Error quitting group.');
        }
      };

    return (
        <div className="mygroups">
            {/*create a group*/}
            <h1>Create A Group</h1>
            <label htmlFor="creategroupid"></label>
            <input
                id="creategroupid"
                type="text"
                placeholder="Enter Group Id"
                value={createId}
                onChange={(e) => setCreateId(e.target.value)}
            />
            <button onClick={createGroup}>
                Create Group
            </button>{" "}

            {/*delete groups you manage*/}
            <h1>Delete A Group</h1>
            <select
            id="deleteSelect"
            value={deleteId}
            onChange={handleDeleteChange}>
                <option value = "" disabled>Select an Option</option>
                {manageGroups.map((group) => <option value = {group.group_id}>{group.group_id}</option>)}
            </select>
            
            <button onClick={deleteGroup}>
                Delete Group
            </button>{" "}
           
            {/*delete a group*/}
            <h1>Quit A Group</h1>
            <select
            id="quitSelect"
            value={quitId}
            onChange={handleQuitChange}>
                <option value = "" disabled>Select an Option</option>
                {userGroups.map((group) => <option value = {group.group_id}>{group.group_id}</option>)}
            </select>
            <button onClick={quitGroup}>
                Quit Group
            </button>

            <h2>Current Groups:</h2>
            {userGroups.length > 0 ? (
                <ul>
                    {userGroups.map((group, index) => (
                        <li key = {index}>
                            <h3>{group.group_id}</h3>
                            {group.group_members.map((member) => <option value = {member}>{member}</option>)}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>None</p>
            )}
        </div>
    );
};

export default MyGroups;