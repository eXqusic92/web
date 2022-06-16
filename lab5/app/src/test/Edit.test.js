import { render, screen, fireEvent, act, waitFor, findByText, waitForElement } from '@testing-library/react';
import Edit from '../Edit';
import Login from '../Login';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from "react-router-dom";

test('edit render', async () => {
    
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ username: 'user1', email: 'email1' }),
      status: 200,
    });

    await render(
        <MemoryRouter>
          <Routes>
            <Route index element={<Edit />} />
            <Route path="edit" element={<Edit />} />
          </Routes>
        </MemoryRouter>
      );

    const elementPlay = await screen.findByText(/user1/i);
    expect(elementPlay).toBeInTheDocument;

    const inputUser = screen.getByPlaceholderText(/username/i);
    fireEvent.change(inputUser, {target: {value: 'queryUser'}});
    expect(inputUser.value).toBe('queryUser');

    const inputEmail = screen.getByPlaceholderText(/email/i);
    fireEvent.change(inputEmail, {target: {value: 'queryEmail'}});
    expect(inputEmail.value).toBe('queryEmail');

    const inputPassword = screen.getByPlaceholderText(/password/i);
    fireEvent.change(inputPassword, {target: {value: 'queryPassword'}});
    expect(inputPassword.value).toBe('queryPassword');

    const changeButton = await screen.findByText(/submit/i);
    userEvent.click(changeButton);
});

test('edit change attempt', async () => {
    
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ username: 'user1', email: 'email1' }),
      status: 200,
    });

    await render(
        <MemoryRouter>
          <Routes>
            <Route index element={<Edit />} />
            <Route path="edit" element={<Edit />} />
          </Routes>
        </MemoryRouter>
      );

    const elementPlay = await screen.findByText(/user1/i);
    expect(elementPlay).toBeInTheDocument;
    
    const changeButton = await screen.findByText(/submit/i);
    userEvent.click(changeButton);
});

test('edit attempt error', async () => {
    
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ message: 'sorry' }),
      status: 400,
    });

    await render(
        <MemoryRouter>
          <Routes>
            <Route index element={<Edit />} />
            <Route path="edit" element={<Edit />} />
            <Route path="login" element={<Edit />} />
          </Routes>
        </MemoryRouter>
      );

    const elementPlay = await screen.findByText(/sorry/i);
    expect(elementPlay).toBeInTheDocument;

    const closeButton = screen.getByText('×');
    userEvent.click(closeButton);
    expect(screen.queryByText(/sorry/i)).toBeNull();    

    const changeButton = await screen.findByText(/submit/i);
    userEvent.click(changeButton);
    const err = await screen.findByText(/sorry/i);
    expect(err).toBeInTheDocument;

    const closeButton2 = screen.getByText('×');
    userEvent.click(closeButton2);
    expect(screen.queryByText(/sorry/i)).toBeNull(); 

    const deleteButton = await screen.findByText(/delete/i);
    userEvent.click(deleteButton);
    const err2 = await screen.findByText(/sorry/i);
    expect(err2).toBeInTheDocument;

    const closeButton3 = screen.getByText('×');
    userEvent.click(closeButton3);
    expect(screen.queryByText(/sorry/i)).toBeNull(); 

});

test('edit change attempt throw error', async () => {
    
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn(() => {throw new Error('sorry');}),
      status: 200,
    });

    await render(
        <MemoryRouter>
          <Routes>
            <Route index element={<Edit />} />
            <Route path="edit" element={<Edit />} />
            <Route path="login" element={<Edit />} />
          </Routes>
        </MemoryRouter>
      );

    const elementPlay = await screen.findByText(/sorry/i);
    expect(elementPlay).toBeInTheDocument;

    const closeButton = screen.getByText('×');
    userEvent.click(closeButton);
    expect(screen.queryByText(/sorry/i)).toBeNull();   
    
    const changeButton = await screen.findByText(/submit/i);
    userEvent.click(changeButton);
    const err = await screen.findByText(/sorry/i);
    expect(err).toBeInTheDocument;

    const closeButton2 = screen.getByText('×');
    userEvent.click(closeButton2);
    expect(screen.queryByText(/sorry/i)).toBeNull(); 

    const deleteButton = await screen.findByText(/delete/i);
    userEvent.click(deleteButton);
    const err2 = await screen.findByText(/sorry/i);
    expect(err2).toBeInTheDocument;

    const closeButton3 = screen.getByText('×');
    userEvent.click(closeButton3);
    expect(screen.queryByText(/sorry/i)).toBeNull(); 
});

test('edit change attempt throw error 2', async () => {
    
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn(() => {throw new Error('sorry');}),
    });

    await render(
        <MemoryRouter>
          <Routes>
            <Route index element={<Edit />} />
            <Route path="edit" element={<Edit />} />
            <Route path="login" element={<Edit />} />
          </Routes>
        </MemoryRouter>
      );

    const deleteButton = await screen.findByText(/delete/i);
    userEvent.click(deleteButton);
    const err2 = await screen.findByText(/sorry/i);
    expect(err2).toBeInTheDocument;

    const closeButton3 = screen.getByText('×');
    userEvent.click(closeButton3);
    expect(screen.queryByText(/sorry/i)).toBeNull(); 
});