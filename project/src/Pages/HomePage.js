import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../Routes/UserContext.js';

const HomePage = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        // Send a request to your server to authenticate the user
        const response = await fetch('http://localhost:3001/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const { user } = await response.json();
            // The user is authenticated. You can now use the `user` object.
            console.log(user);
            setUser(user); // Set the user in the context
            // Navigate to the /user-feed page
            navigate('/user-feed');
        } else {
            // Handle error
            console.log('Authentication failed');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <br />
                <input type="submit" value="Login" />
            </form>
            <Link to="/signup">
                <button>Sign Up</button>
            </Link>
        </div>
    );
}

export default HomePage;