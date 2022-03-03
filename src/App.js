import React from 'react';
import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

/* Components */
import { Start } from './features/start/Start';
import { Burger } from './features/burger/Burger';
import { Articles } from './features/articles/Articles';
import { About } from './features/about/About';
import './App.css';

function App() {
  const show = useSelector(state => state.burger.value)

  return (
    <BrowserRouter>
      <Burger />
      <nav className={'nav col' + (show ? ' hide-right' :  '')}>
        <Link to="/">Start</Link>
        <Link to="/articles">Articles</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;