import React, { useState } from 'react';
import '../App.css';
//import Axios from 'axios';

const user_id = "id123"

const MyGroups = () => {

    const [groups, setGroups] = useState([]);
    const [userGroups, setUserGroups] = useState([]);
    const [manageGroups, setManageGroups] = useState([]);
    const [createId, setCreateId] = useState([]);
    const [deleteId, setDeleteId] = useState([]);
    const [quitId, setQuitId] = useState([]);

    const handleDeleteChange = (event) => {
        setDeleteId(event.target.value);
    };

    const handleQuitChange = (event) => {
        setQuitId(event.target.value);
    };

    const createGroup = () => {
        if (createId !== null) {
            const trimId = createId.trim();
            if (trimId !== "") {
                if (groups.some((group) => group.group_id === trimId)) {
                    postMessage("Id already in use");
                } else {
                    const newGroup = {
                    manager_id: user_id,
                    group_id: trimId,
                    group_members: [user_id]
                    };
                    setGroups([...groups, newGroup])
                    setManageGroups([...manageGroups, newGroup]);
                    setUserGroups([...userGroups, newGroup])
                }
            }
        }
    }

    const deleteGroup = () => {
        if (deleteId !== "" && manageGroups.some((group) => group.group_id === deleteId)) {
            setGroups(groups.filter((groups) => {
                return groups.group_id !== deleteId;
            }));
            setUserGroups(userGroups.filter((userGroups) => {
                return userGroups.group_id !== deleteId;
            }));
            setManageGroups(manageGroups.filter((manageGroups) => {
                return manageGroups.group_id !== deleteId;
            }));
        }
    }

    const quitGroup = () => {
        if (quitId !== "" && userGroups.some((group) => group.group_id === quitId)) {
            setUserGroups(userGroups.filter((userGroups) => {
                return userGroups.group_id !== quitId;
            }));
            if (manageGroups.some((group) => group.group_id === quitId)) {
                setGroups(groups.filter((groups) => {
                    return groups.group_id !== quitId;
                }));
                setManageGroups(manageGroups.filter((manageGroups) => {
                    return manageGroups.group_id !== quitId;
                }));
            }
        }
    }

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