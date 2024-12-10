import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; 

const LoginDemo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="loginContainer">
      <h1>Open all Shopping Lists as a:</h1>
      <div className="buttonContainer">
        <button className="loginButton" onClick={() => navigate('/main-page')}>Owner</button>
        <button className="loginButton" onClick={() => navigate('/main-page')}>Member</button>
        <button className="loginButton" onClick={() => navigate('/access-declined')}>Non-member</button>
      </div>
    </div>
  );
};

export default LoginDemo;