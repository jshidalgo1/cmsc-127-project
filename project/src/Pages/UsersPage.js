import React, { useState } from 'react';
import SignUpPage from './SignUpPage.js';
import UpdateUserPage from './UpdateUserPage.js';
import RemoveUserPage from './RemoveUserPage.js';

const UsersPage = () => {
    const [view, setView] = useState('');

    const handleAddUser = () => {
        setView('add');
    };

    const handleUpdateUser = () => {
        setView('update');
    };

    const handleRemoveUser = () => {
        setView('remove');
    };

    return (
        <div>
            <button onClick={handleAddUser}>Add User</button>
            <button onClick={handleUpdateUser}>Update User Details</button>
            <button onClick={handleRemoveUser}>Remove User</button>

            {view === 'add' && <SignUpPage />}
            {view === 'update' && <UpdateUserPage />}
            {view === 'remove' && <RemoveUserPage />}
        </div>
    );
};





export default UsersPage;