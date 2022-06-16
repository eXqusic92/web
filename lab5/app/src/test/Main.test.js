import { render, screen, fireEvent, act, waitFor, findByText, waitForElement } from '@testing-library/react';
import Main from '../Main';
import Login from '../Login';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from "react-router-dom";
  
afterEach(() => {
    jest.restoreAllMocks();
});

test('tests main render without the token', async() => {

  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({ playlists: [] }),
    status: 200,
  })

  render(<MemoryRouter>
            <Routes>
                <Route index element={<Main />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </MemoryRouter>);

  const element = screen.getByText(/Login/i);
  expect(element).toBeInTheDocument;
});

test('with token', async () => {
    const localStorageMock = (() => {
      let store = {
        token: 'token',
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
      json: jest.fn().mockResolvedValue({ id: 1 }),
      status: 200,
    });

    await render(
        <MemoryRouter>
          <Routes>
            <Route
              index
              element={
                <Main
                  service={'/service/users/'}
                  addId={true}
                  elements={'playlists'}
                  title={'playlists'}
                />
              }
            />
            <Route path='login' element={<Login />} />
          </Routes>
        </MemoryRouter>
      );

    const elementPlay = screen.getByText(/No playlists found/i);
    expect(elementPlay).toBeInTheDocument;
});

test('tests main render with the token but fetch error', async() => {

  const localStorageMock = (() => {
    let store = {
      token: 'token',
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
    json: jest.fn().mockResolvedValue({ playlists: [] }),
    status: 400,
  })

  render(<MemoryRouter>
            <Routes>
                <Route index element={<Main service={'/service/users/'} addId={true} elements={'playlists'} title={'playlists'}/>} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </MemoryRouter>);
});

test('tests main render with search', async() => {

  const localStorageMock = (() => {
    let store = {
      token: 'token',
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
    json: jest.fn().mockResolvedValue({ playlists: [] }),
    status: 200,
  })

  await render(
    <MemoryRouter>
      <Routes>
        <Route
          index
          element={
            <Main
              service={'/service/users/'}
              addId={true}
              elements={'playlists'}
              title={'playlists'}
            />
          }
        />
        <Route path='login' element={<Login />} />
      </Routes>
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText(/search/i);
  fireEvent.change(input, {target: {value: '123'}});

  const formButton = screen.getByText(">");
  userEvent.click(formButton);
  const spanText = await screen.findByText(/search results on query/i);
  expect(spanText).toBeInTheDocument();
});

test('tests main render with error', async() => {
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
            <Main
              service={'/service/users/'}
              addId={true}
              elements={'playlists'}
              title={'playlists'}
            />
          }
        />
        <Route path='login' element={<Login />} />
      </Routes>
    </MemoryRouter>
  );
  
  const expextedText = await screen.findByText(/123msg/i);
  expect(expextedText).toBeInTheDocument();

  const closeButton = screen.getByText('×');
  userEvent.click(closeButton);
  expect(screen.queryByText(/msg/i)).toBeNull();
});

test('tests main render with error without throwing', async() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({ playlists: [], message: '123msg' }),
    status: 200,
  })

  await render(
    <MemoryRouter>
      <Routes>
        <Route
          index
          element={
            <Main
              service={'/service/users/'}
              addId={true}
              elements={'playlists'}
              title={'playlists'}
            />
          }
        />
        <Route path='login' element={<Login />} />
      </Routes>
    </MemoryRouter>
  );
});

test('tests main paga navigations', async() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(
      [
        {
            "id": 29,
            "private": false,
            "songs": [],
            "title": "Jazz Enjoyment_3",
            "user": {
                "username": "oleg1"
            },
            "user_id": 29
        },
        {
            "id": 31,
            "private": true,
            "songs": [],
            "title": "123",
            "user": {
                "username": "oleg"
            },
            "user_id": 20
        },
        {
            "id": 32,
            "private": false,
            "songs": [],
            "title": "1234",
            "user": {
                "username": "oleg"
            },
            "user_id": 20
        }
    ]
    ),
    status: 200,
  })

  await render(
    <MemoryRouter>
      <Routes>
        <Route
          index
          element={
            <Main
              service={'/service/users/'}
              addId={true}
              elements={'playlists'}
              title={'playlists'}
            />
          }
        />
        <Route path='login' element={<Login />} />
      </Routes>
    </MemoryRouter>
  );
  const input = await screen.getByPlaceholderText(/search/i);
  fireEvent.change(input, {target: {value: '3'}});
  let nextSearch = await screen.findByText(">");
  userEvent.click(nextSearch);
  let nextNav = screen.getByLabelText("next-button");
  userEvent.click(nextNav);
  const number = await screen.findByText("2");
  expect(number).toBeInTheDocument();

  let prevNav = await screen.findByText("<");
  userEvent.click(prevNav);
  const newNumber = await screen.findByText("1");
  expect(newNumber).toBeInTheDocument();

});

test('tests main with songs prop setting', async() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(
      [
        {
          id: 1,
          name: 'song1',
          singer: 's1',
          album: 'a1',
          duration: 'd1',
          photo: '',
        },
        {
          id: 2,
          name: 'song2',
          singer: 's2',
          album: 'a2',
          duration: 'd2',
          photo: '',
        },
        {
          id: 3,
          name: 'song3',
          singer: 's3',
          album: 'a3',
          duration: 'd3',
          photo: '',
        },
    ]
    ),
    status: 200,
  })

  await render(
    <MemoryRouter>
      <Routes>
        <Route
          index
          element={
            <Main
              service={'/songs'}
              addId={false}
              elements={'songs'}
              title={'songs'}
            />
          }
        />
        <Route path='login' element={<Login />} />
        <Route path='choose/:songId' element={<Main service={'/service/user/'} addId={true} elements={'choose'} title={'choose playlist'} />} />
      </Routes>
    </MemoryRouter>
  );
  let plusBox = await screen.findAllByText("+");
  userEvent.click(plusBox[0]);

});

test('tests main with choose prop setting', async() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(
      [
        {
          "id": 29,
          "private": false,
          "songs": [],
          "title": "Jazz Enjoyment_3",
          "user": {
              "username": "oleg1"
          },
          "user_id": 29
      },
      {
          "id": 31,
          "private": true,
          "songs": [],
          "title": "123",
          "user": {
              "username": "oleg"
          },
          "user_id": 20
      },
      {
          "id": 32,
          "private": false,
          "songs": [],
          "title": "1234",
          "user": {
              "username": "oleg"
          },
          "user_id": 20
      },
    ]
    ),
    status: 200,
  })

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
      songId: 1,
    })
  }));

  await render(
    <MemoryRouter>
      <Routes>
        <Route
          index
          element={
            <Main service={'/service/user/'} addId={true} elements={'choose'} title={'choose playlist'} />
          }
        />
        <Route path='login' element={<Login />} />
      </Routes>
    </MemoryRouter>
  );
  let playlist = await screen.findByText(/Enjoyment/i);
  expect(playlist).toBeInTheDocument();
  userEvent.click(playlist);
  await screen.debug();
  //userEvent.click(plusBox[0]);

});
