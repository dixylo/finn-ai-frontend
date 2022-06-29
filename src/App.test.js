import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the header Activity Center', () => {
  render(<App />);
  const header = screen.getByText(/Activity Center/i);
  expect(header).toBeInTheDocument();
});
