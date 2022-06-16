import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Object1 from './Object';
import { useNavigate } from "react-router-dom";
import Error from './Error';

function Edit() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error1, setError] = useState(false);
    const [resultMessage, setResultMessage] = useState('');

    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    let navigate = useNavigate();

    const handleChangeUsername = (event) => {
        setNewUsername(event.target.value);
    }

    const handleChangeEmail = (event) => {
        setNewEmail(event.target.value);
    }

    const handleChangePassword = (event) => {
        setNewPassword(event.target.value);
    }

    let getBody = () => {
        let result = {};
        if (newUsername !== ''){
            result.username = newUsername;
        }
        if (newEmail !== ''){
            result.email = newEmail;
        }
        if (newPassword !== ''){
            result.password = newPassword;
        }
        return JSON.stringify(result);
    }

    const handleChangeAttempt = (event) => {
        fetch(`http://127.0.0.1:5000/user/${localStorage.getItem('id')}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: getBody(),
        })
          .then(res => {
                if (res.status !== 200) {
                    setError(true);
                } else {
                    setError(false);
                }
                return res.json();
        })
          .then(
            (result) => {
                if ('message' in result || 'msg' in result){
                    setResultMessage(result);
                } else {
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('id', result.id);
                    setUsername('');
                    navigate('/edit');
                }
            },
            (error) => {
                setError(true);
                setResultMessage(error);
            }
          )
    }

    const handleDeleteAttempt = () => {
        fetch(`http://127.0.0.1:5000/user/${localStorage.getItem('id')}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
          .then(res => {
                if (res.status !== 200) {
                    setError(true);
                    return res.json();
                } else {
                    localStorage.removeItem('token');
                    localStorage.removeItem('id');
                    navigate('/login');
                    return {};
                }
        })
          .then(
            (result) => {
                if ('message' in result || 'msg' in result){
                    setResultMessage(result);
                }
            },
            (error) => {
                setError(true);
                setResultMessage(error);
            }
          )
    }

    useEffect(() => {
        const getUserData = () => {
            fetch("http://127.0.0.1:5000/user", {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
              .then(res => {
                    if (res.status !== 200) {
                        setError(true);
                    }
                    return res.json();
            })
              .then(
                (result) => {
                    if ('message' in result || 'msg' in result){
                        setResultMessage(result);
                    } else if ('username' in result && 'email' in result){
                        if (result.username !== username || result.email !== email){
                            setUsername(result.username);
                            setEmail(result.email);
                        }
                    }
                },
                (error) => {
                    setError(true);
                    setResultMessage(error);
                }
              )
          }
        if (!error1){
            getUserData();
        }
    }, [username, email, error1]);

    const handleCloseClick = () => {
        setError(false);
        setResultMessage('');
    }

    const showError = () => {
        if (error1) {
            return(<Error handleCloseClick={handleCloseClick} message={resultMessage.message}/>);
        } 
    }
    
    return ( 
        <React.Fragment>
        <Navbar />
        <div className="mainpart moveaside">
            <h1>editing</h1>
            {showError()}
            <div className="objectholder">
                <Object1 name={'username: ' + username} title = {'email: ' + email}/>
                <form>
                    <input placeholder="username" className="forminput" onChange={handleChangeUsername}></input>
                    <input placeholder="email" className="forminput" onChange={handleChangeEmail}></input>
                    <input placeholder="password" className="forminput" type="password" onChange={handleChangePassword}>
                    </input>
                    <input onClick={handleChangeAttempt} className="enter" type="button" value="submit"></input>
                </form>

                <form>
                    <input onClick={handleDeleteAttempt} className="enter" type="button" value="delete"></input>
                </form>
            </div>
        </div>
        </React.Fragment>
    );
}

export default Edit;