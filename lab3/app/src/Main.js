import React, { useState } from 'react';
import Navbar from './Navbar';
import  { Navigate } from 'react-router-dom';

function Main() {
    const [token] = useState(localStorage.getItem('token'));
    // const [id] = useState(localStorage.getItem('id'));

    if (token == null) {
        return <Navigate to='/login' />;
    }
    return ( 
    <React.Fragment>
      <Navbar />
      <div className="mainpart moveaside">
        <h1>playlists</h1>
        <div className="alert"></div>
        <form className="search-form">
          <input className="search" type="text" placeholder="search..." name="search"></input>
          <button className="search-button" type="submit">&#x3e;</button>
        </form>
        <div className="objectholder">
        </div>
      </div>
    </React.Fragment>
    );
}

export default Main;
