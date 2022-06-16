import { render, screen, fireEvent } from '@testing-library/react';
import Song from '../Song';

test('tests song', () => {
  const handleButtonClick = jest.fn((id, id2) => {});
  render(<Song id={1} playlistId={-1} button="+" name="SongName" artist="artist" time="3:44" handleButtonClick={handleButtonClick}/>);
  fireEvent.click(screen.getByText("+"));
  expect(handleButtonClick).toHaveBeenCalledTimes(1);
});
