import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const SignUpPage = () => {
    const formRef = useRef();
    const [birthday, setBirthday] = useState(null);
    const [age, setAge] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        data.age = age; // Add the calculated age to the data

        axios.post('http://localhost:3001/addUser', data) 
        .then(response => {
            console.log(response);
            if (response.data.error) {
                alert(response.data.error);
            } else {
                console.log('Success:', response.data);
                formRef.current.reset();
                setAge(null);

            }
        })
        .catch((error) => {
            console.error('Error:', error);
        })
        .finally(() => {
            console.log('Request completed');
        });
    };

    useEffect(() => {
        if (birthday) {
            const today = new Date();
            const birthDate = new Date(birthday);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            setAge(age);
        }
    }, [birthday]);


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
                    Birthday:
                    <input type="date" name="birthday" onChange={e => setBirthday(e.target.value)} />
                </label>
                <label>
                    Age:
                    <input type="number" name="age" value={age || ''} readOnly />
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