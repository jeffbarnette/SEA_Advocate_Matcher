import { renderHook, waitFor } from '@testing-library/react';
import { useAdvocates } from '../useAdvocates';

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock console to avoid noise in tests
const mockConsole = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};
global.console = mockConsole;

describe('useAdvocates', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    mockConsole.error.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch advocates successfully', async () => {
    const mockData = {
      data: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          city: 'New York',
          degree: 'MD',
          specialties: ['Mental Health'],
          yearsOfExperience: 10,
          phoneNumber: '5551234567',
          createdAt: '2023-01-01T00:00:00Z',
        },
      ],
      count: 1,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useAdvocates());

    await waitFor(() => {
      expect(result.current.loading.isLoading).toBe(false);
    });

    expect(result.current.advocates).toEqual(mockData.data);
    expect(result.current.loading.error).toBeNull();
  });

  it('should handle fetch errors', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useAdvocates());

    await waitFor(() => {
      expect(result.current.loading.isLoading).toBe(false);
    });

    expect(result.current.loading.error).toBe('Network error');
    expect(result.current.advocates).toEqual([]);
  });

  it('should handle HTTP errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useAdvocates());

    await waitFor(() => {
      expect(result.current.loading.isLoading).toBe(false);
    });

    expect(result.current.loading.error).toBe('HTTP error! status: 500');
    expect(result.current.advocates).toEqual([]);
  });

  it('should debounce search input', async () => {
    const mockData = { data: [], count: 0 };
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const { result, rerender } = renderHook(
      ({ search }) => useAdvocates({ search }),
      { initialProps: { search: '' } }
    );

    // Change search term
    rerender({ search: 'john' });

    // Should still be loading due to debounce
    expect(result.current.loading.isLoading).toBe(true);

    // Wait for debounce
    await waitFor(() => {
      expect(result.current.loading.isLoading).toBe(false);
    }, { timeout: 1000 });

    expect(mockFetch).toHaveBeenCalledWith('/api/advocates?search=john');
  });

  it('should include city and degree filters in API call', async () => {
    const mockData = { data: [], count: 0 };
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    renderHook(() => useAdvocates({
      search: 'test',
      city: 'New York',
      degree: 'MD',
    }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/advocates?search=test&city=New%20York&degree=MD');
    });
  });
});
