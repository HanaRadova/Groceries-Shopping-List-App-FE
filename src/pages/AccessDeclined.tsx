import React from 'react';
import '../styles.css'; 
const AccessDeclined: React.FC = () => {
  return (
    <div className="accessDeclinedContainer">
      <h1>Access Declined</h1>
      <p>You do not have permission to view this shopping list.</p>
    </div>
  );
};

export default AccessDeclined;