import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUpPage = () => {
    // Implement the form for updating user details here
    const formRef = useRef();
   const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    axios.post('http://localhost:3001/addUser', data) 
    .then(response => {
        console.log('Success:', response.data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    formRef.current.reset();
};

    return (
        <div>
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
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
            <Link to="/">
                <button>Go Back</button>
            </Link>
        </div>
    );
};

export default SignUpPage;