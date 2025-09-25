import { useState, useEffect, useCallback, useRef } from 'react';

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

interface ApiResponse {
  data: Advocate[];
  count: number;
  filters?: {
    search?: string;
    city?: string;
    degree?: string;
  };
}

interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

interface UseAdvocatesOptions {
  search?: string;
  city?: string;
  degree?: string;
  debounceMs?: number;
}

export function useAdvocates(options: UseAdvocatesOptions = {}) {
  const { search = '', city = '', degree = '', debounceMs = 300 } = options;
  
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: true, error: null });
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  const isMountedRef = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Debounce search term
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // For empty search, update immediately (no debounce needed)
    if (search === '') {
      setDebouncedSearch('');
    } else {
      timeoutRef.current = setTimeout(() => {
        setDebouncedSearch(search);
      }, debounceMs);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [search, debounceMs]);

  // Fetch advocates function
  const fetchAdvocates = useCallback(async (searchTerm?: string, cityFilter?: string, degreeFilter?: string) => {
    try {
      setLoading({ isLoading: true, error: null });
      
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (cityFilter) params.append('city', cityFilter);
      if (degreeFilter) params.append('degree', degreeFilter);
      
      const response = await fetch(`/api/advocates?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      
      if (isMountedRef.current) {
        setAdvocates(data.data);
        setLoading({ isLoading: false, error: null });
      }
    } catch (error) {
      if (isMountedRef.current) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch advocates';
        setLoading({ isLoading: false, error: errorMessage });
        console.error('Error fetching advocates:', error);
      }
    }
  }, []);

  // Fetch data when filters change or on initial mount
  useEffect(() => {
    fetchAdvocates(debouncedSearch, city, degree);
  }, [debouncedSearch, city, degree, fetchAdvocates]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Retry function
  const retry = useCallback(() => {
    fetchAdvocates(debouncedSearch, city, degree);
  }, [fetchAdvocates, debouncedSearch, city, degree]);

  return {
    advocates,
    loading,
    retry,
    refetch: () => fetchAdvocates(debouncedSearch, city, degree)
  };
}
