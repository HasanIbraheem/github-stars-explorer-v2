import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import useFetchRepositories from '../hooks/useFetchRepositories';

// Mock the useFetchRepositories hook
jest.mock('../hooks/useFetchRepositories');

test('displays error message on fetch failure', async () => {
  // Mock the hook to return an error
  useFetchRepositories.mockReturnValue({
    repositories: [],
    loading: false,
    error: 'Failed to fetch repositories',
  });

  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

  // Check if the error message is displayed
  await waitFor(() => expect(screen.getByText(/error: failed to fetch repositories/i)).toBeInTheDocument());
});
