import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import Error from './Error';
import Success from './Success';

function Admin() {
    const [error1, setError] = useState(false);
    const [resultMessage, setResultMessage] = useState('');

    const [name, setName] = useState('');
    const [singer, setSinger] = useState('');
    const [album, setAlbum] = useState('');
    const [duration, setDuration] = useState('');
    const [photo, setPhoto] = useState('');
    const [success, setSuccess] = useState(false);

    const [songId, setSongId] = useState(-1);

    let navigate = useNavigate();

    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    const handleChangeSinger = (event) => {
        setSinger(event.target.value);
    }

    const handleChangeAlbum = (event) => {
        setAlbum(event.target.value);
    }

    const handleChangeDuration = (event) => {
        setDuration(event.target.value);
    }

    const handleChangePhoto = (event) => {
        setPhoto(event.target.value);
    }

    const handleChangeId = (event) => {
        setSongId(event.target.value);
    }

    let getBody = () => {
        let result = {
            name: name,
            singer: singer,
            album: album,
            duration: duration,
        };
        if (photo !== ''){
            result.photo = photo;
        }
        return JSON.stringify(result);
    }

    const handleCreateAttempt = (event) => {
        fetch('http://127.0.0.1:5000/song', {
            method: 'POST',
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
                    setSuccess(true);
                }
                return res.json();
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

    const handleDeleteAttempt = () => {
        fetch(`http://127.0.0.1:5000/song/${songId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
          .then(res => {
                if (res.status !== 200) {
                    setError(true);
                    return res.json();
                } else{
                    setSuccess(true);
                    return res.json();
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

    const handleCloseClick = () => {
        setError(false);
        setSuccess(false);
        setResultMessage('');
    }

    const showError = () => {
        if (error1) {
            return(<Error handleCloseClick={handleCloseClick} message={resultMessage.message}/>);
        } 
    }
    
    const showSuccess = () => {
        if (success) {
            return(<Success handleCloseClick={handleCloseClick} message={resultMessage.message}/>);
        } 
    }

    return ( 
        <React.Fragment>
        <Navbar />
        <div className="mainpart moveaside">
            <h1>admin</h1>
            {showError()}
            {showSuccess()}
            <div className="objectholder">
                <h3>-------------------</h3>
                <h3>add song</h3>
                <form>
                    <input placeholder="name" className="forminput" onChange={handleChangeName}></input>
                    <input placeholder="singer" className="forminput" onChange={handleChangeSinger}></input>
                    <input placeholder="album" className="forminput" onChange={handleChangeAlbum}></input>
                    <input placeholder="duration" className="forminput" onChange={handleChangeDuration}></input>
                    <input placeholder="photo" className="forminput" onChange={handleChangePhoto}></input>
                    <input onClick={handleCreateAttempt} className="enter" type="button" value="create"></input>
                </form>
                <h3></h3>
                <h3>-------------------</h3>
                <h3>delete song</h3>
                <form>
                    <input placeholder="id" className="forminput" onChange={handleChangeId}></input>
                    <input onClick={handleDeleteAttempt} style={{marginBottom: '100px'}} className="enter" type="button" value="delete"></input>
                </form>
            </div>
        </div>
        </React.Fragment>
    );
}

export default Admin;