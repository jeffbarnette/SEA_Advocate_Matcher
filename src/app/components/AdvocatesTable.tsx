import React from 'react';
import { Advocate } from '../../types/advocate';

interface AdvocatesTableProps {
  advocates: Advocate[];
}

// Helper function to format phone numbers
const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove all non-digit characters
  const digits = phoneNumber.replace(/\D/g, '');
  
  // Format as (xxx) xxx-xxxx for 10-digit numbers
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  
  // Return original if not 10 digits
  return phoneNumber;
};

const AdvocateCard = React.memo(({ advocate }: { advocate: Advocate }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          {advocate.firstName} {advocate.lastName}
        </h3>
        <p className="text-gray-600">{advocate.degree}</p>
        <p className="text-sm text-gray-500">{advocate.city}</p>
      </div>
      <div className="text-right">
        <div className="badge badge-primary text-xs">
          {advocate.yearsOfExperience} years
        </div>
      </div>
    </div>

    <div className="mb-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Specialties</h4>
      <div className="flex flex-wrap gap-1">
        {advocate.specialties.map((specialty, index) => (
          <span key={`${advocate.id}-specialty-${index}`} className="badge badge-gray text-xs">
            {specialty}
          </span>
        ))}
      </div>
    </div>

    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
      <div className="flex items-center text-sm text-gray-600">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        {formatPhoneNumber(advocate.phoneNumber)}
      </div>
      <a 
        href={`tel:${advocate.phoneNumber}`}
        className="btn btn-primary text-sm px-4 py-2"
      >
        Contact
      </a>
    </div>
  </div>
));

AdvocateCard.displayName = 'AdvocateCard';

export const AdvocatesTable = React.memo(({ advocates }: AdvocatesTableProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {advocates.map((advocate) => (
      <AdvocateCard key={advocate.id} advocate={advocate} />
    ))}
  </div>
));

AdvocatesTable.displayName = 'AdvocatesTable';
