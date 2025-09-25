"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useAdvocates } from "../hooks/useAdvocates";

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

// Memoized table row component
const AdvocateRow = React.memo(({ advocate }: { advocate: Advocate }) => (
  <tr>
    <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{advocate.firstName}</td>
    <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{advocate.lastName}</td>
    <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{advocate.city}</td>
    <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{advocate.degree}</td>
    <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
      {advocate.specialties.map((specialty: string, index: number) => (
        <div key={`${advocate.id}-specialty-${index}`} style={{ marginBottom: "2px" }}>
          {specialty}
        </div>
      ))}
    </td>
    <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{advocate.yearsOfExperience}</td>
    <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{advocate.phoneNumber}</td>
  </tr>
));

AdvocateRow.displayName = 'AdvocateRow';

// Loading component
const LoadingSpinner = React.memo(() => (
  <div style={{ textAlign: 'center', padding: '20px' }}>
    <div style={{ 
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #3498db',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      animation: 'spin 1s linear infinite',
      margin: '0 auto'
    }} />
    <p>Loading advocates...</p>
    <style jsx>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

// Error component
const ErrorMessage = React.memo(({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div style={{ 
    textAlign: 'center', 
    padding: '20px',
    backgroundColor: '#fee',
    border: '1px solid #fcc',
    borderRadius: '4px',
    margin: '20px 0'
  }}>
    <h3>Error loading advocates</h3>
    <p>{error}</p>
    <button onClick={onRetry} style={{
      padding: '8px 16px',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    }}>
      Try Again
    </button>
  </div>
));

ErrorMessage.displayName = 'ErrorMessage';

// Filter controls component
const FilterControls = React.memo(({ 
  searchTerm, 
  cityFilter, 
  degreeFilter, 
  uniqueCities, 
  uniqueDegrees, 
  onSearchChange, 
  onCityChange, 
  onDegreeChange, 
  onReset 
}: {
  searchTerm: string;
  cityFilter: string;
  degreeFilter: string;
  uniqueCities: string[];
  uniqueDegrees: string[];
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onDegreeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onReset: () => void;
}) => (
  <div style={{ marginBottom: "20px", padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
    <div style={{ display: "flex", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
      <div>
        <label htmlFor="search" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
          Search:
        </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search advocates..."
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            minWidth: "200px"
          }}
        />
      </div>
      
      <div>
        <label htmlFor="city" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
          City:
        </label>
        <select
          id="city"
          value={cityFilter}
          onChange={onCityChange}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            minWidth: "150px"
          }}
        >
          <option value="">All Cities</option>
          {uniqueCities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="degree" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
          Degree:
        </label>
        <select
          id="degree"
          value={degreeFilter}
          onChange={onDegreeChange}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            minWidth: "150px"
          }}
        >
          <option value="">All Degrees</option>
          {uniqueDegrees.map(degree => (
            <option key={degree} value={degree}>{degree}</option>
          ))}
        </select>
      </div>
      
      <div style={{ display: "flex", alignItems: "end" }}>
        <button
          onClick={onReset}
          style={{
            padding: "8px 16px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Reset Filters
        </button>
      </div>
    </div>
  </div>
));

FilterControls.displayName = 'FilterControls';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [degreeFilter, setDegreeFilter] = useState("");

  // Use the custom hook for data fetching
  const { advocates, loading, retry } = useAdvocates({
    search: searchTerm,
    city: cityFilter,
    degree: degreeFilter,
    debounceMs: 300
  });

  // Memoized unique cities and degrees for filter dropdowns
  const { uniqueCities, uniqueDegrees } = useMemo(() => {
    const cities = new Set<string>();
    const degrees = new Set<string>();
    
    advocates.forEach(advocate => {
      cities.add(advocate.city);
      degrees.add(advocate.degree);
    });
    
    return {
      uniqueCities: Array.from(cities).sort(),
      uniqueDegrees: Array.from(degrees).sort()
    };
  }, [advocates]);

  // Memoized event handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
  }, []);

  const handleCityChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setCityFilter(e.target.value);
  }, []);

  const handleDegreeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setDegreeFilter(e.target.value);
  }, []);

  const handleReset = useCallback(() => {
    setSearchTerm("");
    setCityFilter("");
    setDegreeFilter("");
  }, []);

  // Show loading state
  if (loading.isLoading) {
    return (
      <main style={{ margin: "24px" }}>
        <h1>Solace Advocates</h1>
        <LoadingSpinner />
      </main>
    );
  }

  // Show error state
  if (loading.error) {
    return (
      <main style={{ margin: "24px" }}>
        <h1>Solace Advocates</h1>
        <ErrorMessage error={loading.error} onRetry={retry} />
      </main>
    );
  }

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      
      <form onSubmit={handleFormSubmit}>
        <FilterControls
          searchTerm={searchTerm}
          cityFilter={cityFilter}
          degreeFilter={degreeFilter}
          uniqueCities={uniqueCities}
          uniqueDegrees={uniqueDegrees}
          onSearchChange={handleSearchChange}
          onCityChange={handleCityChange}
          onDegreeChange={handleDegreeChange}
          onReset={handleReset}
        />
      </form>

      <div style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>
        Showing {advocates.length} advocate{advocates.length !== 1 ? 's' : ''}
        {searchTerm && ` matching "${searchTerm}"`}
        {cityFilter && ` in ${cityFilter}`}
        {degreeFilter && ` with ${degreeFilter}`}
      </div>

      {/* Results Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
          <thead style={{ backgroundColor: "#f8f9fa" }}>
            <tr>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ddd" }}>First Name</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Last Name</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ddd" }}>City</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Degree</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Specialties</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Years of Experience</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {advocates.map((advocate) => (
              <AdvocateRow key={advocate.id} advocate={advocate} />
            ))}
          </tbody>
        </table>
      </div>
      
      {advocates.length === 0 && !loading.isLoading && (
        <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
          <p>No advocates found matching your criteria.</p>
          <button onClick={handleReset} style={{
            padding: "8px 16px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}>
            Clear Filters
          </button>
        </div>
      )}
    </main>
  );
}
