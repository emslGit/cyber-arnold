import React from 'react';
import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

/* Components */
import { Start } from './features/start/Start';
import { Burger } from './features/burger/Burger';
import { Articles } from './features/articles/Articles';
import { Stats } from './features/stats/Stats';
import './App.css';

function App() {
  const show = useSelector(state => state.burger.value);

  return (
    <BrowserRouter>
      <Burger />
      <nav className={'nav col' + (show ? ' hide-right' :  '')}>
        <Link to="/">Start</Link>
        <Link to="/articles">Articles</Link>
        <Link to="/stats">Stats</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;