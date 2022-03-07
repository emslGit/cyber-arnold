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
        <Link onClick={() => dispatch(close())} to="/language/">Start</Link>
        <Link onClick={() => dispatch(close())} to="/language/articles">Articles</Link>
        <Link onClick={() => dispatch(close())} to="/language/stats">Stats</Link>
      </nav>
      <Routes>
        <Route path="/language/" element={<Start />} />
        <Route path="/language/articles" element={<Articles />} />
        <Route path="/language/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;