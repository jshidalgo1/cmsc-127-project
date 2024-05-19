import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <form>
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
                <input type="submit" value="Submit" />
            </form>
            <Link to="/signup">
                <button>Sign Up</button>
            </Link>
        </div>
    );
}

export default HomePage;