import React from 'react';

const SignUpPage = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <label>
                First Name:
                <input type="text" name="firstName" required />
            </label>
            <label>
                Middle Name:
                <input type="text" name="middleName" />
            </label>
            <label>
                Last Name:
                <input type="text" name="lastName" required />
            </label>
            <label>
                Username:
                <input type="text" name="username" required />
            </label>
            <label>
                Password:
                <input type="password" name="password" required />
            </label>
            <label>
                Email:
                <input type="email" name="email" required />
            </label>
            <label>
                Age:
                <input type="number" name="age" min="0" />
            </label>
            <label>
                Birthday:
                <input type="date" name="birthday" />
            </label>
            <input type="submit" value="Sign Up" />
        </form>
    );
};

export default SignUpPage;