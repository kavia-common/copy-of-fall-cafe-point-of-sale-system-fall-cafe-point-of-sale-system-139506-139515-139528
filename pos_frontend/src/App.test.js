import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Order Processing nav', () => {
  render(<App />);
  const nav = screen.getByText(/Order Processing/i);
  expect(nav).toBeInTheDocument();
});
