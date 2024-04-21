import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders song player header', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/Welches Lied wird hier abgespielt?/i);
  expect(headerElement).toBeInTheDocument();
});