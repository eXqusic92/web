import { render, screen, fireEvent } from '@testing-library/react';
import PageNav from '../PageNav';
import { MemoryRouter } from "react-router-dom";

test('tests pagenav next button', () => {
  const handleButtonClick = jest.fn(() => {});
  render(<PageNav handleNext={handleButtonClick} limit={5} number={5}/>, {wrapper: MemoryRouter});
  fireEvent.click(screen.getByText(">"));
  expect(handleButtonClick).toHaveBeenCalledTimes(1);
});

test('tests pagenav without next button', () => {
  const handleButtonClick = jest.fn(() => {});
  render(<PageNav handleNext={handleButtonClick} limit={5} number={4}/>, {wrapper: MemoryRouter});
  expect(screen.queryByText(">")).toBeNull();
});