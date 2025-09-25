import React from 'react';
import styles from '../advocates.module.css';

interface NoResultsProps {
  onReset: () => void;
}

export const NoResults = React.memo(({ onReset }: NoResultsProps) => (
  <div className={styles.noResultsContainer}>
    <p>No advocates found matching your criteria.</p>
    <button onClick={onReset} className={styles.noResultsButton}>
      Clear Filters
    </button>
  </div>
));

NoResults.displayName = 'NoResults';
