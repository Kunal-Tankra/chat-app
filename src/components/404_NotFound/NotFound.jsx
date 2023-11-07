import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import styles from "./NotFound.module.css"

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.back_button} onClick={goBack}>
        <ArrowBackIcon className={styles.back_icon} />
      </div>
      <ErrorIcon className={styles.error_icon} />
      <h1 className={styles.heading} >404 Not Found</h1>
      <p  className={styles.sentence} >Oops! The page you are looking for doesn't exist.</p>
    </div>
  );
};

export default NotFound;
