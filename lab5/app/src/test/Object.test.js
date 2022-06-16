import { render, screen, fireEvent } from '@testing-library/react';
import Object1 from '../Object';
import { BrowserRouter } from "react-router-dom";

test('tests object function', () => {
  render(<Object1 name="theName" title="title" link="/library"/>, {wrapper: BrowserRouter});
  expect(screen.getByText(/theName/).closest('a')).toHaveAttribute('href', '/library');

  render(<Object1 name="theName2" title="title" />);
  expect(screen.queryByText(/theName2/).closest('a')).toBeNull();

  const handleCloseClick = jest.fn((id) => {});
  render(<Object1 name="theName3" title="title" handleChooseClick={handleCloseClick} playlistId={1}/>);
  fireEvent.click(screen.getByText(/theName3/));
  expect(handleCloseClick).toHaveBeenCalledTimes(1);

  render(<Object1 name="theName4" title="title" additional={true}/>);
  screen.getByText(/(private)/);

  render(<Object1 name="theName5" title="title" additional={false}/>);
  screen.getByText(/(public)/);

});
