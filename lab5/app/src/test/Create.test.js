import { render, screen, fireEvent, act, waitFor, findByText } from '@testing-library/react';
import Create from '../Create';
import Playlist from '../Playlist';
import { MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Routes, Route } from "react-router-dom";
  
afterEach(() => {
    jest.restoreAllMocks();
});

test('tests create private creation', async() => {

  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({id: 1, user: {username: 'user1'}, title: 'query', songs: []}),
    status: 200,
  })

  render(<MemoryRouter>
                        <Routes>
                            <Route index element={<Create />} />
                            <Route path="playlist/:playlistId" element={<Playlist />} />
                        </Routes>
                    </MemoryRouter>);

  const input = screen.getByPlaceholderText(/title/i);
  fireEvent.change(input, {target: {value: 'query'}});
  expect(input.value).toBe('query');

  const publicPrivate = screen.getByLabelText('private');
  fireEvent.click(publicPrivate);
  expect(publicPrivate.checked).toEqual(true);

  const formButton = screen.getByRole('button');
  userEvent.click(formButton);
  const itemPrivate = await screen.findByText(/user1/i);
  expect(itemPrivate).toBeInTheDocument();
});

test('tests create public', async() => {

  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({id: 1, user: {username: 'user1'}, title: 'query', songs: []}),
    status: 200,
  })

  render(<MemoryRouter>
                        <Routes>
                            <Route index element={<Create />} />
                            <Route path="playlist/:playlistId" element={<Playlist />} />
                        </Routes>
                    </MemoryRouter>);

  const input = screen.getByPlaceholderText(/title/i);
  fireEvent.change(input, {target: {value: 'query'}});
  expect(input.value).toBe('query');

  const publicPrivate = screen.getByLabelText('private');
  fireEvent.click(publicPrivate);
  fireEvent.click(publicPrivate);
  expect(publicPrivate.checked).toEqual(false);
  
  const formButton = screen.getByRole('button');
  userEvent.click(formButton);
  const itemPublic = await screen.findByText(/user1/i);
  expect(itemPublic).toBeInTheDocument();
});

test('tests create error', async() => {

  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({id: 1, message: 'msg'}),
    status: 400,
  })

  render(<MemoryRouter>
                        <Routes>
                            <Route index element={<Create />} />
                            <Route path="playlist/:playlistId" element={<Playlist />} />
                        </Routes>
                    </MemoryRouter>);

  const input = screen.getByPlaceholderText(/title/i);
  fireEvent.change(input, {target: {value: 'query'}});

  const formButton = screen.getByRole('button');
  userEvent.click(formButton);
  const itemPublic = await screen.findByText(/msg/i);
  expect(itemPublic).toBeInTheDocument();

  const closeButton = screen.getByText('×');
  userEvent.click(closeButton);
  expect(screen.queryByText(/msg/i)).toBeNull();
});

test('tests create with error with throwing', async() => {

  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn(() => {throw new Error('123msg');}),
    status: 400,
  })

  render(<MemoryRouter>
                        <Routes>
                            <Route index element={<Create />} />
                            <Route path="playlist/:playlistId" element={<Playlist />} />
                        </Routes>
                    </MemoryRouter>);

  const input = screen.getByPlaceholderText(/title/i);
  fireEvent.change(input, {target: {value: 'query'}});

  const formButton = screen.getByRole('button');
  userEvent.click(formButton);
  const itemPublic = await screen.findByText(/123msg/i);
  expect(itemPublic).toBeInTheDocument();
});

