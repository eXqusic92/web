import React from 'react';
// import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Main from './Main';
import Registration from './Registration';
import Edit from './Edit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="edit" element={<Edit />} />
        </Route>
      </Routes>
  </BrowserRouter>
  );
}
 
export default App;