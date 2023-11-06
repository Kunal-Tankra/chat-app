import React from 'react';
import './NotFound.css';
import ErrorIcon from '@mui/icons-material/Error';
const NotFound = () => {
  return (
    <div className="not-found-container">
      <ErrorIcon className="error-icon" /> {/* Add the Error icon */}
      <h1>404 Not Found</h1>
      <p>Oops! The page you are looking for doesn't exist.</p>
    </div>
  );
};

export default NotFound;
