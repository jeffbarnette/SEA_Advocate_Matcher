import React from 'react';
import styles from '../advocates.module.css';

interface ErrorMessageProps {
  error: string;
  onRetry: () => void;
}

export const ErrorMessage = React.memo(({ error, onRetry }: ErrorMessageProps) => (
  <div className={styles.errorContainer}>
    <h3 className={styles.errorTitle}>Error loading advocates</h3>
    <p>{error}</p>
    <button onClick={onRetry} className={styles.retryButton}>
      Try Again
    </button>
  </div>
));

ErrorMessage.displayName = 'ErrorMessage';
