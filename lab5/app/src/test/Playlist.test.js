import { render, screen, fireEvent, act, waitFor, findByText } from '@testing-library/react';
import Playlist from '../Playlist';
import { MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Routes, Route } from "react-router-dom";

afterEach(() => {
    jest.restoreAllMocks();
});

test('tests playlist wit status code error', async() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({message: '123msg'}),
      status: 400,
    })
  
    await render(
      <MemoryRouter>
        <Routes>
          <Route
            index
            element={
              <Playlist />
            }
          />
        </Routes>
      </MemoryRouter>
    );
    let err = await screen.findByText(/sorry/i);
    expect(err).toBeInTheDocument();

    const closeButton = screen.getByText('×');
    userEvent.click(closeButton);
    expect(screen.queryByText(/sorry/i)).toBeNull();
  });

test('tests playlist with throw error', async() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn(() => {throw new Error('123msg');}),
      status: 200,
    })

    await render(
      <MemoryRouter>
        <Routes>
          <Route
            index
            element={
              <Playlist />
            }
          />
        </Routes>
      </MemoryRouter>
    );
    let err = await screen.findByText(/sorry/i);
    expect(err).toBeInTheDocument();
    const closeButton = screen.getByText('×');
    userEvent.click(closeButton);
    expect(screen.queryByText(/sorry/i)).toBeNull();
});

test('tests playlist song delete attempt', async() => {
  const localStorageMock = (() => {
    let store = {
      token: 'token',
      id: 1
    };
    return {
      getItem(key) {
        return store[key];
      },
      setItem(key, value) {
        store[key] = value.toString();
      },
      clear() {
        store = {};
      },
      removeItem(key) {
        delete store[key];
      },
    };
  })();
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });

  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(
        {
            "id": 29,
            "private": false,
            "songs": [
              {
              id: 1,
              name: 'song1',
              singer: 's1',
              album: 'a1',
              duration: 'd1',
              photo: '',
            },
          ],
            "title": "justtitle",
            "user": {
                "username": "user1"
            },
            "user_id": 1
        },
    ),
    status: 200,
  });
  
    const {container} = await render(
      <MemoryRouter>
        <Routes>
          <Route index element={<Playlist />}/>
        </Routes>
      </MemoryRouter>
    );
    const delButton = await screen.findByText(/-/i);
    userEvent.click(delButton);
    
    const delPlayButton = await screen.findByText(/delete/i);
    userEvent.click(delPlayButton);
    // let err = await screen.findByText(/sorry/i);
    // expect(err).toBeInTheDocument();
  
});