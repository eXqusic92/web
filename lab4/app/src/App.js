import React from 'react';
// import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Main from './Main';
import Registration from './Registration';
import Edit from './Edit';
import Playlist from './Playlist';
import Create from './Create';
import Admin from './Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Main service={'/service/users/'} addId={true} elements={'playlists'} title={'playlists'} />} />
          <Route path="library" element={<Main service={'/service/user/'} addId={true} elements={'playlists'} title={'library'} />} />
          <Route path="songs" element={<Main service={'/songs'} addId={false} elements={'songs'} title={'songs'} />} />
          <Route path="choose/:songId" element={<Main service={'/service/user/'} addId={true} elements={'choose'} title={'choose playlist'} />} />
          <Route path="login" element={<Login />} />
          <Route path="create" element={<Create />} />
          <Route path="registration" element={<Registration />} />
          <Route path="edit" element={<Edit />} />
          <Route path="playlist/:playlistId" element={<Playlist />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
  </BrowserRouter>
  );
}
 
export default App;