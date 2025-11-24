import React, { useState, useMemo } from 'react';
import "./LoginPage.css";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const navigate = useNavigate();
  const showLogin = () => { setMessage(null); setIsLoginActive(true); };
  const showSignup = () => { setMessage(null); setIsLoginActive(false); };

  // Password validation for Login
  const loginValidation = useMemo(() => {
    return {
      lengthOk: loginPassword.length >= 8,
      upperOk: /[A-Z]/.test(loginPassword),
      numberOk: /[0-9]/.test(loginPassword),
      specialOk: /[^A-Za-z0-9]/.test(loginPassword),
    };
  }, [loginPassword]);

  // Email validator
const isValidEmail = (email) => {
  const allowedDomains = [
    "gmail.com",
    "yahoo.com",
    "yahoo.in",
    "outlook.com",
    "hotmail.com",
    "icloud.com",
    "protonmail.com",
    "rediffmail.com",
    "aol.com"
  ];
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return false;
  const domain = email.split('@')[1]?.toLowerCase();
  return allowedDomains.includes(domain);};
  // Local storage helpers
  const getUsers = () => {
    try {
      const raw = localStorage.getItem('tourfinity_users');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  };
  const saveUsers = (users) => {
    localStorage.setItem('tourfinity_users', JSON.stringify(users));
  };
  const findUserByEmail = (email) => {
    const users = getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  };
  // LOGIN HANDLER
  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setMessage({ type: 'error', text: 'Please enter email and password.' });
      return;
    }
    if (!isValidEmail(loginEmail)) {
      setMessage({ type: 'error', text: 'Please enter a valid email.' });
      return;
    }
    const { lengthOk, upperOk, numberOk, specialOk } = loginValidation;
    if (!(lengthOk && upperOk && numberOk && specialOk)) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters and include an uppercase letter, a number and a special character.' });
      return;
    }
    const user = findUserByEmail(loginEmail);
    if (!user) {
      setMessage({ type: 'error', text: 'No account found. Please sign up.' });
      return;
    }
    if (user.password !== loginPassword) {
      setMessage({ type: 'error', text: 'Incorrect password. Try again or reset.' });
      return;
    }
    localStorage.setItem('tourfinity_user', JSON.stringify({ email: user.email, name: user.name }));
    setMessage({ type: 'success', text: 'Login successful — redirecting...' });
    setTimeout(() => navigate('/'), 800);
  };
  // SIGNUP HANDLER
  const handleSignup = (e) => {
    e.preventDefault();

    if (!signupUsername || !signupEmail || !signupPassword) {
      setMessage({ type: 'error', text: 'Please fill all signup fields.' });
      return;
    }
    if (!isValidEmail(signupEmail)) {
      setMessage({ type: 'error', text: 'Enter a valid email format (example: name@email.com).' });
      return;
    }
    if (findUserByEmail(signupEmail)) {
      setMessage({ type: 'error', text: 'Email already registered — Try logging in.' });
      return;
    }
    if (signupPassword.length < 8 || !/[A-Z]/.test(signupPassword) || !/[0-9]/.test(signupPassword) || !/[^A-Za-z0-9]/.test(signupPassword)) {
      setMessage({ type: 'error', text: 'Password must include uppercase, number, and special character.' });
      return;
    }
    const users = getUsers();
    const newUser = { name: signupUsername, email: signupEmail, password: signupPassword };
    users.push(newUser);
    saveUsers(users);

    localStorage.setItem('tourfinity_user', JSON.stringify(newUser));
    setMessage({ type: 'success', text: 'Signup successful — redirecting...' });
    setTimeout(() => navigate('/'), 800);
  };
  // FORGOT PASSWORD UI
  const handleForgotClick = () => {
    setShowReset(true);
    setMessage(null);
  };
  const handleResetSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(resetEmail)) {
      setMessage({ type: 'error', text: 'Please enter a valid email format.' });
      return;
    }
    const users = getUsers();
    const idx = users.findIndex(u => u.email.toLowerCase() === resetEmail.toLowerCase());

    if (idx === -1) {
      setMessage({ type: 'error', text: 'No account found with this email.' });
      return;
    }
    if (resetPassword.length < 8 || !/[A-Z]/.test(resetPassword) || !/[0-9]/.test(resetPassword) || !/[^A-Za-z0-9]/.test(resetPassword)) {
      setMessage({ type: 'error', text: 'Password must include uppercase, number and special character.' });
      return;
    }
    users[idx].password = resetPassword;
    saveUsers(users);

    setMessage({ type: 'success', text: 'Password reset successful — you are now logged in.' });
    setShowReset(false);
    setTimeout(() => navigate('/'), 900);
  };
  return (
    <div className="login-page">
      <div className="forms-wrap">
        <h1 className="logo">
          <span className="orange">TOUR</span>FINITY
        </h1>

        <div className="forms-section">

          {/* Tabs */}
          <div className="tabs">
            <button className={`tab ${isLoginActive ? 'active' : ''}`} onClick={showLogin}>Login</button>
            <button className={`tab ${!isLoginActive ? 'active' : ''}`} onClick={showSignup}>Signup</button>
          </div>

          {message && <div className={`auth-message ${message.type}`}>{message.text}</div>}

          {/* LOGIN FORM */}
          <form className={`form ${isLoginActive ? 'active' : ''}`} onSubmit={handleLogin}>
            <h2>Login with your email and password</h2>
            <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
            <button type="submit">Login</button>

            <a href="#" className="forgot" onClick={handleForgotClick}>Forgot Password?</a>
            {showReset && (
              <div className="reset-box">
                <h3>Reset Password</h3>
                <input type="email" placeholder="Enter email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} />
                <input type="password" placeholder="New password" value={resetPassword} onChange={(e) => setResetPassword(e.target.value)} />
                <button onClick={handleResetSubmit}>Reset Password</button>
                <button onClick={() => setShowReset(false)}>Cancel</button>
              </div>
            )}
            <p className="switch-text">
              Don't have an account? <a href="#" onClick={showSignup}>Signup</a>
            </p>
          </form>
          {/* SIGNUP FORM */}
          <form className={`form ${!isLoginActive ? 'active' : ''}`} onSubmit={handleSignup}>
            <h2>Create your account</h2>
            <input type="text" placeholder="Username" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} required />
            <input type="email" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
            <button type="submit">Signup</button>
            <p className="switch-text">
              Already have an account? <a href="#" onClick={showLogin}>Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
