import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login';
import { MemoryRouter } from "react-router-dom";

test('tests login page', () => {
  const page = render(<Login />, {wrapper: MemoryRouter});

  const inputName = page.getByPlaceholderText(/username/i);
  fireEvent.change(inputName, {target: {value: 'query'}});
  expect(inputName.value).toBe('query');

  const inputPassword = page.getByPlaceholderText(/password/i);
  fireEvent.change(inputPassword, {target: {value: 'query'}});
  expect(inputPassword.value).toBe('query');
});
