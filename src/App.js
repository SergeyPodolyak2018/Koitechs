import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import {Search} from "./features/search"
import {User} from "./features/user"

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Search />}/>} />
          <Route path="user/:name" element={<User />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
