import { render, screen, fireEvent } from '@testing-library/react';
import Error from '../Error';

test('tests error', () => {
  render(<Error message="randomMessage"/>);
  expect(screen.getByText("randomMessage")).toBeInTheDocument();
});
