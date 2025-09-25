import React from 'react';
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

interface AdvocateRowProps {
  advocate: Advocate;
}

export const AdvocateRow = React.memo(({ advocate }: AdvocateRowProps) => (
  <tr>
    <td className={styles.tableCell}>{advocate.firstName}</td>
    <td className={styles.tableCell}>{advocate.lastName}</td>
    <td className={styles.tableCell}>{advocate.city}</td>
    <td className={styles.tableCell}>{advocate.degree}</td>
    <td className={styles.tableCell}>
      {advocate.specialties.map((specialty: string, index: number) => (
        <div key={`${advocate.id}-specialty-${index}`} className={styles.specialtyItem}>
          {specialty}
        </div>
      ))}
    </td>
    <td className={styles.tableCell}>{advocate.yearsOfExperience}</td>
    <td className={styles.tableCell}>{advocate.phoneNumber}</td>
  </tr>
));

AdvocateRow.displayName = 'AdvocateRow';
