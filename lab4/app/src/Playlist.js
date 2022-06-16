import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import Song from './Song';
import Error from './Error';
import deleteSongFromPlaylist from './requests';
import deletePlaylist from './deleteRequest';

function Playlist() {
    const params = useParams();

    const [token] = useState(localStorage.getItem('token'));
    const [id] = useState(localStorage.getItem('id'));
    const [error1, setError] = useState(false);
    const [resultMessage, setResultMessage] = useState('');
    const [playlist, setPlaylist] = useState({'title': 'Loading...', 'user': {'username': ''}, songs: []});
    const [changes, setChanges] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
      const getPlaylist = () => {
        const requestLink =`http://127.0.0.1:5000/playlist/${params.playlistId}`;
        fetch(requestLink, {
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
                    setResultMessage({'message': 'Sorry, you can not access this playlist'});
                } else {
                    if (result !== playlist){
                        setPlaylist(result);
                    }
                }
            },
            (error) => {
                setError(true);
                setResultMessage({'message': 'Sorry, you can not access this playlist'});
            }
          )
      }
      if (!error1){
          getPlaylist();
      }
    }, [changes])

    const handleButtonClick = (id, playlist) => {
      deleteSongFromPlaylist(id, playlist, localStorage.getItem('token'), setError, setResultMessage);
      setChanges(!changes);
    }

    const placeSongs = () => {
      if (!error1 && playlist.songs.length === 0){
        return <h3>Playlist is empty!</h3>
      } else if (!error1){
        const playlistItems = playlist.songs.map((song) =>
          <Song key={song.id} id={song.id} playlistId={playlist.id} img={song.photo} button="-" name={song.name} artist={song.singer} time={song.duration} handleButtonClick={handleButtonClick} />
        );
        return playlistItems;
      }
    }

    const handleCloseClick = () => {
      setError(false);
      setResultMessage('');
      if (resultMessage.message === 'Sorry, you can not access this playlist'){
        navigate('/');
      }
    }

    const showError = () => {
      if (error1) {
          return(<Error handleCloseClick={handleCloseClick} message={resultMessage.message}/>);
      } 
    }

    const handleDeleteAttepmt = (playlistId) => {
      deletePlaylist(playlistId, token, setError, setResultMessage, navigate);
    }

    const placeDeleteButton = () => {
      if (!error1 && 'user' in playlist && 'user_id' in playlist && 'id' in playlist && parseInt(id) === playlist.user_id) {
          return(
            <input onClick={() => {handleDeleteAttepmt(playlist.id)}} style={{marginBottom: '15px'}} className="enter" type="button" value="delete">
            </input>
          );
      } 
    }

    return (
    <React.Fragment>
      <Navbar />
      <div className="mainpart moveaside">
        <h2>{playlist.title}</h2>
        <h3>{playlist.user.username}</h3>
        {showError()}
        {placeDeleteButton()}
        <div className="objectholder">
          {placeSongs()}
        </div>
      </div>
    </React.Fragment>
    );
}

export default Playlist;