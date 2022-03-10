import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getArticles, nextWord, setLatestAns } from './articlesSlice'
import { postStats, addCorrect, addIncorrect } from '../stats/statsSlice'
import './Articles.css';

export const Articles = () => {
  const stats = useSelector((state) => state.stats);
  const articles = useSelector((state) => state.articles);
  const [translate, setTranslate] = useState(false);
  const [running, setRunning] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (articles.word === undefined) {
      dispatch(postStats(stats));
      dispatch(getArticles());
    }
  }, [articles.word])

  const handleAns = (ans) => {
    var __correct

    __correct = (ans === articles.word.art);

    if (__correct) {
      dispatch(addCorrect(articles.word));
    } else {
      dispatch(addIncorrect(articles.word));
    }

    dispatch(setLatestAns(__correct));
    dispatch(nextWord());
  }

  const handleStart = async () => {
    await dispatch(getArticles());
    setRunning(true);
  }

  return (
    <div className='Articles bg'>
      <span className='wrapper col'>
        {running && articles.word != undefined && <button id='btn-translate' className='btn-small' onClick={() => setTranslate(!translate)}>Translate</button>}
        <h3 style={{ color: articles.prevWord?.de ? (articles.latestAns ? 'lawngreen' : 'crimson') : 'white' }}>
          {articles.prevWord?.de ? `${articles.latestAns ? 'Correct' : 'Incorrect'} - ${articles.prevWord.art} ${articles.prevWord.de}` : 'Articles'}
        </h3>
        {running && <h2>{(articles.word != undefined) ? (translate ? articles.word?.en : articles.word?.de) : 'Please reset stats'}</h2>}
        {!running && <h2>{'Press to start'}</h2>}
        <span>
          {(running && articles.word != undefined) && <>
            <button className='btn-standard' onClick={() => handleAns('der')}>Der</button>
            <button className='btn-standard' onClick={() => handleAns('die')}>Die</button>
            <button className='btn-standard' onClick={() => handleAns('das')}>Das</button>
          </>}
          {!running && <button className='btn-standard' onClick={() => handleStart()}>{'Start'}</button>}
        </span>
      </span>
    </div>
  )
}