import { render, screen } from '@testing-library/react';
import App from './App';

test('renders sidebar brand', () => {
  render(<App />);
  const el = screen.getByText(/Fall Cafe POS/i);
  expect(el).toBeInTheDocument();
});
