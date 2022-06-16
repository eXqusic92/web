import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import  { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Error from './Error';
import Object1 from './Object';
import PageNav from './PageNav';
import Song from './Song';
import {useParams} from 'react-router-dom';
import addSongToPlaylist from './addRequest';

function Main(props) {
    const [token] = useState(localStorage.getItem('token'));
    const [id] = useState(localStorage.getItem('id'));
    const [playlists, setPlaylists] = useState([]);
    const [error1, setError] = useState(false);
    const [resultMessage, setResultMessage] = useState('');
    const [limit] = useState(3);
    // const [offset, setOffset] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [searchBeforeSubmit, setSearchBeforeSubmit] = useState('');

    const params = useParams();

    let navigate = useNavigate();

    useEffect(() => {
      setPage(1);
      setSearch('');
    }, [props.service, props.elements])

    useEffect(() => {
      const getPlaylists = () => {
        let requestLink =`http://127.0.0.1:5000${props.service}`;
        if (props.addId){
          requestLink += `${id}`;
        }
        if (search === ''){
          requestLink += `?limit=${limit}&offset=${limit * (page - 1)}`;
        } else {
          requestLink += `?limit=${limit}&offset=${limit * (page - 1)}&q=${search}`;
        }

        fetch(requestLink, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
          .then(res => {
                if (res.status !== 200) {
                    navigate("/login");
                    setError(true);
                }
                return res.json();
        })
          .then(
            (result) => {
                if ('message' in result || 'msg' in result){
                    setResultMessage(result);
                } else {
                    if (result !== playlists){
                        setPlaylists(result);
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
          getPlaylists();
      }
    }, [search, page, props.service])

    const showError = () => {
      if (error1) {
          return(<Error handleCloseClick={handleCloseClick} message={resultMessage.message}/>);
      } 
    }

    const handleCloseClick = () => {
      setError(false);
      setResultMessage('');
    }

    const showSearchInfo = () => {
      if (search !== ''){
        return(
          <span style={{color: 'white', textAlign: 'center', display: 'block'}}>search results on query "{search}":</span>
        );
      }
    }

    const handleSearchChange = (event) => {
      setSearchBeforeSubmit(event.target.value);
    }

    const handleSearch = () => {
      setSearch(searchBeforeSubmit);
      setPage(1);
    }
    
    const handlePrev = () => {
      if (page > 1){
        setPage(page - 1);
      }
    }

    const handleNext = () => {
      setPage(page + 1);
    }

    const placePlaylists = () => {
      if ((!error1 && playlists.length === 0) || !('user' in playlists[0])){
        return <h3>No playlists found</h3>
      } else if (!error1){
        const playlistItems = playlists.map((playlist) =>
          <Object1 key={playlist.id} link={`/playlist/${playlist.id}`} name={playlist.title} title={playlist.user.username} additional={playlist.private} />
        );
        return playlistItems;
      }
    }

    const handleButtonClick = (id, playlist) => {
      navigate(`/choose/${id}`);
    }

    const handleChooseClick = (id) => {
      addSongToPlaylist(params.songId, id, token, setError, setResultMessage, navigate);
    }

    const placePlaylistsToChoose = () => {
      if ((!error1 && playlists.length === 0) || !('user' in playlists[0])){
        return <h3>No playlists found</h3>
      } else if (!error1){
        const playlistItems = playlists.map((playlist) =>
          <Object1 key={playlist.id} handleChooseClick={handleChooseClick} playlistId={playlist.id} name={playlist.title} title={playlist.user.username} additional={playlist.private} />
        );
        return playlistItems;
      }
    }

    const placeSongs = () => {
      if ((!error1 && playlists.length === 0) || ('user' in playlists[0])){
        return <h3>No songs found</h3>
      } else if (!error1){
        const playlistItems = playlists.map((song) =>
          <Song key={song.id} id={song.id} img={song.photo} playlistId={-1} button="+" name={song.name} artist={song.singer} time={song.duration} handleButtonClick={handleButtonClick} />
        );
        return playlistItems;
      }
    }

    const placeElements = () => {
      if (!error1){
        if (props.elements === 'songs'){
          return placeSongs();
        } else if (props.elements === 'playlists') {
          return placePlaylists();
        } else if (props.elements === 'choose') {
          return placePlaylistsToChoose();
        }
      }
    }

    if (token == null) {
      return <Navigate to='/login' />;
    }
    return ( 
    <React.Fragment>
      <Navbar />
      <div className="mainpart moveaside">
        <h1>{props.title}</h1>
        {showError()}
        <div className="alert"></div>
        <form className="search-form">
          <input className="search" onChange={handleSearchChange} type="text" placeholder="search..." name="search"></input>
          <button className="search-button" onClick={handleSearch} type="button" style={{cursor: 'pointer'}}>&#x3e;</button>
        </form>
        {showSearchInfo()}
        <div className="objectholder">
          {placeElements()}
        </div>
        <PageNav number={playlists.length} limit={limit} page={page} handlePrev={handlePrev} handleNext={handleNext}/>
      </div>
    </React.Fragment>
    );
}

export default Main;
