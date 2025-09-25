import React from 'react';

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
  <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      <div className="lg:col-span-2">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
          Search
        </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search by name, specialty, or experience..."
          className="input w-full"
        />
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <select
          id="city"
          value={cityFilter}
          onChange={onCityChange}
          className="select w-full"
        >
          <option value="">All Locations</option>
          {uniqueCities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-2">
          Credentials
        </label>
        <select
          id="degree"
          value={degreeFilter}
          onChange={onDegreeChange}
          className="select w-full"
        >
          <option value="">All Credentials</option>
          {uniqueDegrees.map(degree => (
            <option key={degree} value={degree}>{degree}</option>
          ))}
        </select>
      </div>

      <div>
        <div className="h-6 mb-2"></div>
        <button onClick={onReset} className="btn btn-outline w-full lg:w-auto">
          Clear Filters
        </button>
      </div>
    </div>
  </div>
));

FilterControls.displayName = 'FilterControls';
