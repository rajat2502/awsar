import React, { useState } from 'react';

import { StyledForm } from 'components/StyledForm';

function Signup() {
  const [role, setRole] = useState('employee');
  const [pending, setPending] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [passoword, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSubmit = (e) => {
    setPending(true);
    e.preventDefault();
    setPending(false);
  };

  return (
    <StyledForm width="380px">
      <h1>Sign Up</h1>
      <div>
        <button
          className={role === 'employee' ? 'selected py-1' : 'py-1'}
          onClick={() => setRole('employee')}>
          Employee
        </button>
        <button
          className={role === 'employer' ? 'selected py-1' : 'py-1'}
          onClick={() => setRole('employer')}>
          Employer
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          onClick={(e) => setUsername(e.target.value)}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onClick={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onClick={(e) => setPassword(e.target.value)}
        />
        <input
          name="password2"
          type="password"
          placeholder="Confirm Password"
        />
        <button
          type="submit"
          disabled={pending}
          onClick={(e) => setPassword2(e.target.value)}>
          {!pending ? 'Sign Up' : 'Signing Up...'}
        </button>
      </form>
    </StyledForm>
  );
}

export default Signup;
