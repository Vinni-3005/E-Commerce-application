/*

Creating roles

*/

import React, { useState,useEffect } from 'react';
import RoleFeatureSelector from './RoleFeatureSelector';
import { getFeatures, createRole, assignRoleToUser } from '../../../../server/services/roleService';

const CreateRoles = () => {
    const [roleName, setRoleName] = useState('');
    const [features, setFeatures] = useState([]);
    const [selectedFeatures, setselectedFeatures] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [roles, setRoles] = useState([]);

    useEffect( () => {
        fetchFeatures();
        fetchUsers();
    }, []);

    //fetch available features
    const fetchFeatures = async () => {
        const response = await getFeatures();
        setFeatures(response.data.features);  //assuming API returns { features:[]}
    };

    //fetch list os users 
    const fetchUsers = async () => {
        //mock API endpoint
        const response = await fetch('/api/users'); //need to adjust API endpoint
        const data = await response.json();
        setUsers(data.users);
    };

    //handle role creation 
    const handleCreateRole = async () => {
        if(!role == Name || selectedFeatures.lenght === 0) {
            alert('Role name and features are required!')
            return;
        }

        const response = await createRole( { name:roleName, features:selectedFeatures});
        if(response.success) {
            alert('Role created successfully!');
            setRoles([...roles, response.data.role]);
            setRoleName('');
            setselectedFeatures([]);
        }
    };

    //handle assigning the role to user
    const handleAssignRole = async () => {
        if(!selectedUser || !roleName) {
            alert('select a user and role');
            return;
        }

        const response = await assignRoleToUser( { userID: selectedUser, roleName})
        if(response.success) {
            alert('Role assigned successfully');
        }
    };

    return (
        <div className="Create-roles">
            <h1>Create and Assign Roles</h1>
            
            {/* create role section*/}
            <div className='create-role-section '>
                <h2>Create Role </h2>
                <input
                    type="text"
                    placeholder = "Enter role name"
                    value = {roleName}
                    onChange={ (e) => setRoleName(e.target.value)}
                />
                <RoleFeatureSelector
                    features={features}
                    selectedFeatures={selectedFeatures}
                    setselectedFeatures={setselectedFeatures}
                />
                <button onClick={handleCreateRole}>Create Role</button>
            </div>

            {/* Assign Role section  */}
            <div className='Assign-role-section'>
                <h2>Assign Role</h2>
                <select onChange={ (e) => setSelectedUser(e.target.value)} value={selectedUser}>
                    <option value=" ">Select User</option>
                    {users.map( (user) => (
                        <option key={user._id} value = {user._id}>
                            {user.firstName} {user.lastName} ({user.email})
                        </option>
                    ))}
                </select>
                <button onClick={handleAssignRole}>Assign Role</button>
            </div>
        </div>
    );
};

export default CreateRoles;

