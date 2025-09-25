import React from 'react';
import { AdvocateRow } from './AdvocateRow';
import styles from '../advocates.module.css';

interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
  createdAt: string;
}

interface AdvocatesTableProps {
  advocates: Advocate[];
}

export const AdvocatesTable = React.memo(({ advocates }: AdvocatesTableProps) => (
  <div className={styles.tableContainer}>
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          <th className={styles.tableHeader}>First Name</th>
          <th className={styles.tableHeader}>Last Name</th>
          <th className={styles.tableHeader}>City</th>
          <th className={styles.tableHeader}>Degree</th>
          <th className={styles.tableHeader}>Specialties</th>
          <th className={styles.tableHeader}>Years of Experience</th>
          <th className={styles.tableHeader}>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {advocates.map((advocate) => (
          <AdvocateRow key={advocate.id} advocate={advocate} />
        ))}
      </tbody>
    </table>
  </div>
));

AdvocatesTable.displayName = 'AdvocatesTable';
