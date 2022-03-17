import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { postStats, resetStats } from './statsSlice'
import { resetArticles } from '../articles/articlesSlice'
import './Stats.css';

export const Stats = () => {
  const stats = useSelector((state) => state.stats);
  const dispatch = useDispatch();

  const resetAll = () => {
    dispatch(resetStats());
    dispatch(resetArticles());
  }

  return (
    <div className='Stats bg'>
      <span className="col left wrapper">
        <h3>
          Stats
        </h3>
        <table>
          <tbody>
            <tr>
              <td>Correct:</td>
              <td>{stats.correctCount || 0}</td>
            </tr>
            <tr>
              <td>Total:</td>
              <td>{stats.totalCount || 0}</td>
            </tr>
            <tr>
              <td>Ratio:</td>
              <td>{(stats.correctCount / stats.totalCount || 0).toLocaleString(undefined,{style: 'percent'})}</td>
            </tr>
          </tbody>
        </table>
        <button className='btn-standard' onClick={() => resetAll()}>Reset</button>
      </span>
    </div>
  )
}