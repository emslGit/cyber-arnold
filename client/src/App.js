import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

/* Components */
import { Start } from './features/start/Start';
import { Burger } from './features/burger/Burger';
import { Articles } from './features/articles/Articles';
import { Stats } from './features/stats/Stats';
import { close } from './features/burger/burgerSlice'
import './App.css';

function App() {
  const show = useSelector(state => state.burger.value);
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Burger />
      <nav className={'nav col' + (show ? '' : ' hide-right')}>
        <Link onClick={() => dispatch(close())} to="/">Start</Link>
        <Link onClick={() => dispatch(close())} to="/articles">Articles</Link>
        <Link onClick={() => dispatch(close())} to="/stats">Stats</Link>
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