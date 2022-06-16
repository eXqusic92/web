import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="sidebar">
            <Link to="/">PLAYLISTS</Link>
            <Link to="/songs">SONGS</Link>
            <Link to="/library">LIBRARY</Link>
            <Link to="/create">CREATE PLAYLIST</Link>
            <Link to="/login">LOGOUT</Link>
            <Link to="/edit">EDIT ACCOUNT</Link>
        </div>
    );
}
 
export default Navbar;