import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { StyledForm } from 'components/StyledForm';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);

  const handleSubmit = (e) => {
    setPending(true);
    e.preventDefault();
    setPending(false);
  };

  return (
    <StyledForm width="360px">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="passoword"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={pending}>
          {!pending ? 'Login' : 'Logging in...'}
        </button>
        <p>
          Don't have an account? <Link to="/signup">Sign Up!</Link>
        </p>
      </form>
    </StyledForm>
  );
}

export default Login;
