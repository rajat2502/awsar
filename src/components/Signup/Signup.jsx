import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { signUp } from 'api';
import { StyledForm } from 'components/StyledForm';

function Signup({ setUser }) {
  const history = useHistory();

  const [userRole, setUserRole] = useState('Employee');
  const [pending, setPending] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(null);

  const handleValidation = () => password === password2;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      setPending(true);
      setError(null);
      const data = await signUp(
        { username: userName, password, password2, email: userEmail },
        userRole,
      );
      if (data.error) setError(data.error);
      else {
        const { username, role, email } = data;
        setUser({ username, role, email });
        if (data.role === 'Employee') history.push('/jobs');
        else history.push('/createJob');
      }
      setPending(false);
    } else setError("Passwords don't match!");
  };

  // if (localStorage.getItem('token')) {
  //   return <Redirect to="/dashboard" />;
  // }

  return (
    <StyledForm width="380px">
      <h1>Sign Up</h1>
      <div>
        <button
          className={userRole === 'Employee' ? 'selected py-1' : 'py-1'}
          onClick={() => setUserRole('Employee')}>
          Employee
        </button>
        <button
          className={userRole === 'Employer' ? 'selected py-1' : 'py-1'}
          onClick={() => setUserRole('Employer')}>
          Employer
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button type="submit" disabled={pending}>
          {!pending ? 'Sign Up' : 'Signing Up...'}
        </button>
        {error && <p className="error">{error}</p>}
        <p>
          Already have an account? <Link to="/login">Login!</Link>
        </p>
      </form>
    </StyledForm>
  );
}

export default Signup;
