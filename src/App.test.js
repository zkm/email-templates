import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Template react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Template A/i);
  expect(linkElement).toBeInTheDocument();
});
