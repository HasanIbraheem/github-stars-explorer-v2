import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders app header', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const headerElement = screen.getByText(/GitHub Stars Explorer/i);
  expect(headerElement).toBeInTheDocument();
});
