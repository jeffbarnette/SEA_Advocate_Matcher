import React from 'react';
import styles from '../advocates.module.css';

interface FilterControlsProps {
  searchTerm: string;
  cityFilter: string;
  degreeFilter: string;
  uniqueCities: string[];
  uniqueDegrees: string[];
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onDegreeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onReset: () => void;
}

export const FilterControls = React.memo(({
  searchTerm,
  cityFilter,
  degreeFilter,
  uniqueCities,
  uniqueDegrees,
  onSearchChange,
  onCityChange,
  onDegreeChange,
  onReset,
}: FilterControlsProps) => (
  <div className={styles.filterContainer}>
    <div className={styles.filterRow}>
      <div className={styles.filterGroup}>
        <label htmlFor="search" className={styles.filterLabel}>
          Search:
        </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search advocates..."
          className={styles.filterInput}
        />
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="city" className={styles.filterLabel}>
          City:
        </label>
        <select
          id="city"
          value={cityFilter}
          onChange={onCityChange}
          className={styles.filterSelect}
        >
          <option value="">All Cities</option>
          {uniqueCities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="degree" className={styles.filterLabel}>
          Degree:
        </label>
        <select
          id="degree"
          value={degreeFilter}
          onChange={onDegreeChange}
          className={styles.filterSelect}
        >
          <option value="">All Degrees</option>
          {uniqueDegrees.map(degree => (
            <option key={degree} value={degree}>{degree}</option>
          ))}
        </select>
      </div>

      <div className={styles.filterButtonContainer}>
        <button onClick={onReset} className={styles.resetButton}>
          Reset Filters
        </button>
      </div>
    </div>
  </div>
));

FilterControls.displayName = 'FilterControls';
