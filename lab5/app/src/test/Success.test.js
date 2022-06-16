import { render, screen, fireEvent, getByText } from '@testing-library/react';
import Success from '../Success';

test('tests success', () => {
  render(<Success message="randomMessage"/>);
  expect(screen.getByText("randomMessage")).toBeInTheDocument();
});
