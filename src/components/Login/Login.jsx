import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { login } from 'api';
import { StyledForm } from 'components/StyledForm';

function Login({ setUser }) {
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    setPending(true);
    setError(null);
    e.preventDefault();
    const data = await login({ username: userName, password });
    if (data.error) setError(data.error);
    else {
      const { username, role, email } = data;
      setUser({ username, role, email });
      localStorage.setItem('user', JSON.stringify({ username, role, email }));
      if (data.role === 'Employee') history.push('/jobs');
      else history.push('/createJob');
    }
    setPending(false);
  };

  // if (localStorage.getItem('token')) {
  //   return <Redirect to="/dashboard" />;
  // }

  return (
    <StyledForm width="360px">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          required
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={pending}>
          {!pending ? 'Login' : 'Logging in...'}
        </button>
        {error && <p className="error">{error}</p>}
        <p>
          Don't have an account? <Link to="/signup">Sign Up!</Link>
        </p>
      </form>
    </StyledForm>
  );
}

export default Login;
