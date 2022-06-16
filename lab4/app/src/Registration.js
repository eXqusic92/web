import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Error from './Error';


function Registration() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password_1, setPassword1] = useState('');
    const [error1, setError] = useState(false);
    const [resultMessage, setResultMessage] = useState('');

    let navigate = useNavigate();

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangePassword1 = (event) => {
        setPassword1(event.target.value);
    }

    const handleCloseClick = () => {
        setError(false);
        setResultMessage('');
    }

    const showError = () => {
        if (error1) {
            return(<Error handleCloseClick={handleCloseClick} message={resultMessage.message}/>);
        } 
    }

    const registrationAttempt = () => {
        fetch("http://127.0.0.1:5000/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password_1,
            }),
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
                } else {
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('id', result.id);
                    navigate("/");
                }
            },
            (error) => {
                setError(true);
                setResultMessage(error);
            }
          )
    }

    return (
        <div className="mainpart">
            <h1>register</h1>
            {showError()}
            <div className="alert"></div>
            <div className="objectholder">
                <form id="register-form">
                    <input name="username" onChange={handleChangeUsername} placeholder="username" className="forminput">
                    </input>
                    <input name="email" onChange={handleChangeEmail} placeholder="email" className="forminput"></input>
                    <input name="passwordOne" onChange={handleChangePassword1} placeholder="password" className="forminput" type="password"></input>
                    <Link to="/login" className="forget"><span>Already have account?</span></Link>
                    <input onClick={registrationAttempt} className="enter" type="button" value="submit"></input>
                </form>
            </div>
        </div>
    );
}

export default Registration;