"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useAdvocates } from "../hooks/useAdvocates";
import { Advocate } from "./types/advocate";
import { SolaceLogo } from "./components/SolaceLogo";
import { FilterControls } from "./components/FilterControls";
import { AdvocatesTable } from "./components/AdvocatesTable";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ErrorMessage } from "./components/ErrorMessage";
import { NoResults } from "./components/NoResults";
import { Footer } from "./components/Footer";
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
      <div className="min-h-screen bg-white">
        {/* Simple header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
          <SolaceLogo size="md" variant="full" />
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">Advocate Directory</h1>
            <LoadingSpinner />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show error state
  if (loading.error) {
    return (
      <div className="min-h-screen bg-white">
        {/* Simple header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
          <SolaceLogo size="md" variant="full" />
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">Advocate Directory</h1>
            <ErrorMessage error={loading.error} onRetry={handleRetry} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Simple header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <SolaceLogo size="md" variant="full" />
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Advocate Directory</h1>
          <p className="text-gray-600">Search and filter our network of healthcare advocates</p>
        </div>

        {/* Search and filters */}
        <form onSubmit={handleFormSubmit} className="mb-8">
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

        {/* Results summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <p className="text-gray-700">
            Showing <span className="font-semibold text-primary">{advocates.length}</span> advocate{advocates.length !== 1 ? 's' : ''}
            {searchTerm && ` matching "${searchTerm}"`}
            {cityFilter && ` in ${cityFilter}`}
            {degreeFilter && ` with ${degreeFilter}`}
          </p>
        </div>

        {/* Results */}
        <AdvocatesTable advocates={advocates} />
        
        {advocates.length === 0 && !loading.isLoading && (
          <NoResults onReset={handleReset} />
        )}
      </main>
      <Footer />
    </div>
  );
}
