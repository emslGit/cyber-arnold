import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { resetStats } from './statsSlice'
import { resetArticles } from '../articles/articlesSlice'
import './Stats.css';

export const Stats = () => {
  const correctCount = useSelector((state) => state.stats.correctCount);
  const totalCount = useSelector((state) => state.stats.totalCount);
  const dispatch = useDispatch();

  const resetAll = () => {
    dispatch(resetStats());
    dispatch(resetArticles());
  }

  return (
    <div className='Stats bg'>
      <span className="col left wrapper">
        <h2>
          Stats
        </h2>
        <table>
          <tbody>
            <tr>
              <td>Correct:</td>
              <td>{correctCount || 0}</td>
            </tr>
            <tr>
              <td>Total:</td>
              <td>{totalCount || 0}</td>
            </tr>
            <tr>
              <td>Ratio:</td>
              <td>{(correctCount / totalCount || 0).toLocaleString(undefined,{style: 'percent'})}</td>
            </tr>
          </tbody>
        </table>
        <button className='btn-standard' onClick={() => resetAll()}>Reset</button>
      </span>
    </div>
  )
}