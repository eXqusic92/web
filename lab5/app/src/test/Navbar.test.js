import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';
import { MemoryRouter } from "react-router-dom";

test('tests navbar', () => {
  render(<Navbar />, {wrapper: MemoryRouter});
  expect(screen.getByText(/library/i)).toHaveAttribute('href', '/library');
  expect(screen.getByText(/songs/i)).toHaveAttribute('href', '/songs');
  expect(screen.getByText(/playlists/i)).toHaveAttribute('href', '/');
  expect(screen.getByText(/create/i)).toHaveAttribute('href', '/create');
  expect(screen.getByText(/logout/i)).toHaveAttribute('href', '/login');
  expect(screen.getByText(/edit/i)).toHaveAttribute('href', '/edit');
});
