import { renderHook, act } from '@testing-library/react-hooks';
import useFetchRepositories from './useFetchRepositories';

describe('useFetchRepositories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error
  });

  afterEach(() => {
    console.error.mockRestore(); // Restore console.error after each test
  });

  test('fetches repositories successfully', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ items: [{ id: 1, name: 'Repo 1' }] }),
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useFetchRepositories('test'));

    await waitForNextUpdate();

    expect(result.current.repositories).toHaveLength(1);
    expect(result.current.repositories[0].name).toBe('Repo 1');
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('handles fetch error', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    const { result, waitForNextUpdate } = renderHook(() => useFetchRepositories('test'));

    await waitForNextUpdate();

    expect(result.current.repositories).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Network error');
  });

  test('handles HTTP error status', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useFetchRepositories('test'));

    await waitForNextUpdate();

    expect(result.current.repositories).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('HTTP error! status: 404');
  });
});
