"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useAdvocates } from "../hooks/useAdvocates";
import { Advocate } from "./types/advocate";
import { FilterControls } from "./components/FilterControls";
import { AdvocatesTable } from "./components/AdvocatesTable";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ErrorMessage } from "./components/ErrorMessage";
import { NoResults } from "./components/NoResults";
import styles from "./advocates.module.css";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [degreeFilter, setDegreeFilter] = useState("");

  const { advocates, loading, retry } = useAdvocates({
    search: searchTerm,
    city: cityFilter,
    degree: degreeFilter,
    debounceMs: 300,
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

  const handleRetry = useCallback(() => {
    retry();
  }, [retry]);

  // Show loading state
  if (loading.isLoading) {
    return (
      <main className={styles.main}>
        <h1>Solace Advocates</h1>
        <LoadingSpinner />
      </main>
    );
  }

  // Show error state
  if (loading.error) {
    return (
      <main className={styles.main}>
        <h1>Solace Advocates</h1>
        <ErrorMessage error={loading.error} onRetry={handleRetry} />
      </main>
    );
  }

  return (
    <main className={styles.main}>
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

      <div className={styles.resultsSummary}>
        Showing {advocates.length} advocate{advocates.length !== 1 ? 's' : ''}
        {searchTerm && ` matching "${searchTerm}"`}
        {cityFilter && ` in ${cityFilter}`}
        {degreeFilter && ` with ${degreeFilter}`}
      </div>

      {/* Results Table */}
      <AdvocatesTable advocates={advocates} />
      
      {advocates.length === 0 && !loading.isLoading && (
        <NoResults onReset={handleReset} />
      )}
    </main>
  );
}
