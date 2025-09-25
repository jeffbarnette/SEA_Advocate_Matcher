"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";

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

// Simple loading component
const LoadingSpinner = () => (
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
);

// Error component
const ErrorMessage = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
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
);

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [degreeFilter, setDegreeFilter] = useState("");

  // Simple fetch function
  const fetchAdvocates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (cityFilter) params.append('city', cityFilter);
      if (degreeFilter) params.append('degree', degreeFilter);
      
      const response = await fetch(`/api/advocates?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setAdvocates(data.data);
      setLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch advocates';
      setError(errorMessage);
      setLoading(false);
      console.error('Error fetching advocates:', err);
    }
  }, [searchTerm, cityFilter, degreeFilter]);

  // Initial fetch
  useEffect(() => {
    fetchAdvocates();
  }, [fetchAdvocates]);

  // Memoized unique cities and degrees
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

  // Event handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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

  const handleRetry = useCallback(() => {
    fetchAdvocates();
  }, [fetchAdvocates]);

  // Show loading state
  if (loading) {
    return (
      <main style={{ margin: "24px" }}>
        <h1>Solace Advocates</h1>
        <LoadingSpinner />
      </main>
    );
  }

  // Show error state
  if (error) {
    return (
      <main style={{ margin: "24px" }}>
        <h1>Solace Advocates</h1>
        <ErrorMessage error={error} onRetry={handleRetry} />
      </main>
    );
  }

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      
      {/* Search and Filter Controls */}
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
              onChange={handleSearchChange}
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
              onChange={handleCityChange}
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
              onChange={handleDegreeChange}
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
              onClick={handleReset}
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
        
        <div style={{ fontSize: "14px", color: "#666" }}>
          Showing {advocates.length} advocate{advocates.length !== 1 ? 's' : ''}
          {searchTerm && ` matching "${searchTerm}"`}
          {cityFilter && ` in ${cityFilter}`}
          {degreeFilter && ` with ${degreeFilter}`}
        </div>
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
              <tr key={advocate.id}>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{advocate.firstName}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{advocate.lastName}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{advocate.city}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{advocate.degree}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  {advocate.specialties.map((specialty, index) => (
                    <div key={`${advocate.id}-specialty-${index}`} style={{ marginBottom: "2px" }}>
                      {specialty}
                    </div>
                  ))}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{advocate.yearsOfExperience}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{advocate.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {advocates.length === 0 && !loading && (
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
