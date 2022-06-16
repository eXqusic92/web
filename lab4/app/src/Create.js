import React, { useState } from 'react';
import Navbar from './Navbar';
import createPlaylist from './creationRequest';
import Error from './Error';
import { useNavigate } from "react-router-dom";

function Create() {
    const [title, setTitle] = useState('');
    const [privatePlaylist, setPrivate] = useState(false);
    const [error1, setError] = useState(false);
    const [resultMessage, setResultMessage] = useState('');

    let navigate = useNavigate();

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleChangePrivate = (event) => {
        const value = event.target.value;
        if (privatePlaylist){
            setPrivate(false)
        } else {
            setPrivate(true);
        }
    }

    const handleCreation = (event) => {
        let pp = false;
        if (privatePlaylist){
            pp = true;
        }
        createPlaylist(title, localStorage.getItem('id'), pp, localStorage.getItem('token'), setError, setResultMessage, navigate);
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

    return (
    <React.Fragment>
      <Navbar />
      <div className="mainpart moveaside">
        <h3></h3>
        <h2>create playlist</h2>
        <h3></h3>
        {showError()}
        <form>
            <input placeholder="title" className="forminput" onChange={handleChangeTitle}></input>
            <input type="checkbox" id="private" name="private" value={true} onChange={handleChangePrivate}></input>
            <label className="checkbox-text" htmlFor="private"> private</label><br></br>
            <input className="enter" type="button" value="create" onClick={handleCreation}></input>
        </form>
      </div>
    </React.Fragment>
    );
}

export default Create;