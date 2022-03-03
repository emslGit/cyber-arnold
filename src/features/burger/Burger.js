import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { toggle } from './burgerSlice'
import './Burger.css';

export const Burger = () => {
  const show = useSelector((state) => state.burger.value);
  const dispatch = useDispatch();

  return (
    <div className={"Burger col" + " " + (show ? '' : 'x-menu')} onClick={() => dispatch(toggle())}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}