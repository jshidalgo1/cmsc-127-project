import React from 'react';

const SignInPage = () => {
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
        </div>
      
    );
  }

export default SignInPage;