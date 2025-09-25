import React from 'react';
import styles from '../advocates.module.css';

export const LoadingSpinner = React.memo(() => (
  <div className={styles.loadingContainer}>
    <div className={styles.spinner}></div>
    <p className={styles.loadingText}>Loading advocates...</p>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';
