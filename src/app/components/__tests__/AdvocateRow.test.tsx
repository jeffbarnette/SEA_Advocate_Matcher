import React from 'react';
import { render, screen } from '@testing-library/react';
import { AdvocateRow } from '../AdvocateRow';
import { Advocate } from '../../types/advocate';

// Mock CSS modules
jest.mock('../../advocates.module.css', () => ({
  tableCell: 'table-cell',
  specialtyItem: 'specialty-item',
}));

const mockAdvocate: Advocate = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  city: 'New York',
  degree: 'MD',
  specialties: ['Mental Health', 'Anxiety'],
  yearsOfExperience: 10,
  phoneNumber: '5551234567',
  createdAt: '2023-01-01T00:00:00Z',
};

describe('AdvocateRow', () => {
  it('renders advocate information correctly', () => {
    render(<AdvocateRow advocate={mockAdvocate} />);
    
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('MD')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('5551234567')).toBeInTheDocument();
  });

  it('renders all specialties', () => {
    render(<AdvocateRow advocate={mockAdvocate} />);
    
    expect(screen.getByText('Mental Health')).toBeInTheDocument();
    expect(screen.getByText('Anxiety')).toBeInTheDocument();
  });

  it('renders empty specialties gracefully', () => {
    const advocateWithNoSpecialties = {
      ...mockAdvocate,
      specialties: [],
    };
    
    render(<AdvocateRow advocate={advocateWithNoSpecialties} />);
    
    expect(screen.getByText('John')).toBeInTheDocument();
    // Should not crash or show error
  });

  it('has proper accessibility attributes', () => {
    render(<AdvocateRow advocate={mockAdvocate} />);
    
    const row = screen.getByRole('row');
    expect(row).toBeInTheDocument();
    
    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(7); // 7 columns
  });
});
