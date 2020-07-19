import React from 'react';
import { Link } from 'react-router-dom';

import { StyledForm } from 'components/StyledForm';

function Login() {
  const handleSubmit = () => {};

  return (
    <StyledForm width="320px">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" />
        <input type="passoword" placeholder="Password" />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/signup">Sign Up!</Link>
        </p>
      </form>
    </StyledForm>
  );
}

export default Login;
