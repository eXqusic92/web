import { render, screen, fireEvent, act, waitFor, findByText, waitForElement } from '@testing-library/react';
import Admin from '../Admin';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from "react-router-dom";

test('tests admin page', async() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({ message: '123msg' }),
    status: 200,
  });

  const page = render(
                  <MemoryRouter>
                    <Routes>
                      <Route index element={<Admin />} />,
                      
                    </Routes>
                  </MemoryRouter>
                );

  const inputName = page.getByPlaceholderText(/name/i);
  fireEvent.change(inputName, {target: {value: 'query'}});
  expect(inputName.value).toBe('query');

  const inputSinger = page.getByPlaceholderText(/singer/i);
  fireEvent.change(inputSinger, {target: {value: 'query'}});
  expect(inputSinger.value).toBe('query');

  const inputAlbum = page.getByPlaceholderText(/album/i);
  fireEvent.change(inputAlbum, {target: {value: 'query'}});
  expect(inputAlbum.value).toBe('query');

  const inputDuration = page.getByPlaceholderText(/duration/i);
  fireEvent.change(inputDuration, {target: {value: 'query'}});
  expect(inputDuration.value).toBe('query');

  const inputPhoto = page.getByPlaceholderText(/photo/i);
  fireEvent.change(inputPhoto, {target: {value: 'query'}});
  expect(inputPhoto.value).toBe('query');

  const inputId = page.getByPlaceholderText(/id/i);
  fireEvent.change(inputId, {target: {value: 'query'}});
  expect(inputId.value).toBe('query');

  const createButton = await screen.findAllByText(/create/i);
  userEvent.click(createButton[1]);

  const sMessage = await screen.findByText(/123msg/i);
  expect(sMessage).toBeInTheDocument();
  screen.debug();

  const closeButton = screen.getByText('×');
  userEvent.click(closeButton);
  expect(screen.queryByText(/123msg/i)).toBeNull();

  const deleteButton = await screen.findAllByText(/delete/i);
  userEvent.click(deleteButton[1]);

  const sMessage2 = await screen.findByText(/123msg/i);
  expect(sMessage2).toBeInTheDocument();
  screen.debug();

  const closeButton2 = screen.getByText('×');
  userEvent.click(closeButton2);
  expect(screen.queryByText(/123msg/i)).toBeNull();

});

test('tests admin page with bad status', async() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({ message: '123msg' }),
    status: 400,
  });

  const page = render(
                  <MemoryRouter>
                    <Routes>
                      <Route index element={<Admin />} />,
                      
                    </Routes>
                  </MemoryRouter>
                );

  const createButton = await screen.findAllByText(/create/i);
  userEvent.click(createButton[1]);

  const sMessage = await screen.findByText(/123msg/i);
  expect(sMessage).toBeInTheDocument();
  screen.debug();

  const closeButton = screen.getByText('×');
  userEvent.click(closeButton);
  expect(screen.queryByText(/123msg/i)).toBeNull();

  const deleteButton = await screen.findAllByText(/delete/i);
  userEvent.click(deleteButton[1]);

  const sMessage2 = await screen.findByText(/123msg/i);
  expect(sMessage2).toBeInTheDocument();
  screen.debug();

  const closeButton2 = screen.getByText('×');
  userEvent.click(closeButton2);
  expect(screen.queryByText(/123msg/i)).toBeNull();

});

test('tests admin page with throw error', async() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn(() => {throw new Error('123msg');}),
    status: 400,
  });

  const page = render(
                  <MemoryRouter>
                    <Routes>
                      <Route index element={<Admin />} />,
                      
                    </Routes>
                  </MemoryRouter>
                );

  const createButton = await screen.findAllByText(/create/i);
  userEvent.click(createButton[1]);

  const sMessage = await screen.findByText(/123msg/i);
  expect(sMessage).toBeInTheDocument();
  screen.debug();

  const closeButton = screen.getByText('×');
  userEvent.click(closeButton);
  expect(screen.queryByText(/123msg/i)).toBeNull();

  const deleteButton = await screen.findAllByText(/delete/i);
  userEvent.click(deleteButton[1]);

  const sMessage2 = await screen.findByText(/123msg/i);
  expect(sMessage2).toBeInTheDocument();
  screen.debug();

  const closeButton2 = screen.getByText('×');
  userEvent.click(closeButton2);
  expect(screen.queryByText(/123msg/i)).toBeNull();

});
