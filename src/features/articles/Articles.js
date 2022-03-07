import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchWords, setWords, nextWord, incTotal, setLatestAns, resetArticles } from './articlesSlice'
import { addCorrect, addIncorrect, resetIncorrect } from '../stats/statsSlice'
import './Articles.css';

export const Articles = () => {
  const correctWords = useSelector((state) => state.stats.correctWords);
  const incorrectWords = useSelector((state) => state.stats.incorrectWords);
  const words = useSelector((state) => state.articles.words);
  const word = useSelector((state) => state.articles.word);
  const prevWord = useSelector((state) => state.articles.prevWord);
  const latestAns = useSelector((state) => state.articles.latestAns);
  const [translate, setTranslate] = useState(false);
  const [running, setRunning] = useState(false);
  const dispatch = useDispatch();

  const handleAns = (ans) => {
    var __correct;
    var __word;

    do {
      if (!words.length && !incorrectWords.length) {
        setRunning(false);
        resetArticles();
      } else if (!words.length) {
        dispatch(setWords(incorrectWords));
        dispatch(resetIncorrect());
      }

      __word = dispatch(nextWord());
    } while (correctWords.includes(__word));

    __correct = (ans === word.art);
    if (__correct) {
      dispatch(addCorrect(word));
    } else {
      dispatch(addIncorrect(word));
    }

    dispatch(setLatestAns(__correct));
    dispatch(incTotal());
  }

  const handleStart = async () => {
    await dispatch(fetchWords());
    dispatch(nextWord());
    setRunning(true);
  }

  return (
    <div className='Articles bg'>
      <span className='wrapper col'>
        {word?.de && <button id='btn-translate' className='btn-small' onClick={() => setTranslate(!translate)}>Translate</button>}
        <h3 style={{ color: prevWord?.de ? (latestAns ? 'lawngreen' : 'crimson') : 'white' }}>
          {prevWord?.de ? `${latestAns ? 'Correct' : 'Incorrect'} - ${prevWord.art} ${prevWord.de}` : "Articles"}
        </h3>
        <h2>{running ? (translate ? word.en : word.de) : "Press to start"}</h2>
        <span>{running ?
          <>
            <button className='btn-standard' onClick={() => handleAns('der')}>Der</button>
            <button className='btn-standard' onClick={() => handleAns('die')}>Die</button>
            <button className='btn-standard' onClick={() => handleAns('das')}>Das</button>
          </>
          :
          <button className='btn-standard' onClick={() => handleStart()}>Start</button>
        }
        </span>
      </span>
    </div>
  )
}