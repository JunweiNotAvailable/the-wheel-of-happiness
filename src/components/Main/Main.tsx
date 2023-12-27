import React, { useEffect, useState } from 'react'
import { initialScore, wheelOfLifeName, wheelOfLifePage, wheelOfLifeScore } from '../../utils/Constants';
import Login from './Login/Login';
import { Score } from '../../utils/Interfaces';
import Process from './Process/Process';
import Results from './Results/Results';

export interface MainProps {
  name: string
  setName: React.Dispatch<React.SetStateAction<string>>
  score: Score
  setScore: React.Dispatch<React.SetStateAction<Score>>
  page: number 
  setPage: React.Dispatch<React.SetStateAction<number>>
  reset?: () => void
}

const Main = () => {

  const [name, setName] = useState('');
  const [score, setScore] = useState(initialScore);
  const [page, setPage] = useState(0); // save data only when page changes
  const props = { name, setName, score, setScore, page, setPage };

  // initial effect
  useEffect(() => {
    // get page from local storage
    const currPage = localStorage.getItem(wheelOfLifePage);
    if (currPage) { // setup data if there's history
      setPage(parseInt(currPage));
      setName(localStorage.getItem(wheelOfLifeName) || '');
      setScore(JSON.parse(localStorage.getItem(wheelOfLifeScore) || ''));
    }
  }, []);

  // reset function
  const reset = () => {
    localStorage.removeItem(wheelOfLifeName);
    localStorage.removeItem(wheelOfLifePage);
    localStorage.removeItem(wheelOfLifeScore);
    setName('');
    setScore(initialScore);
    setPage(0);
  }

  return (
    <div className='app main'>
      {page === 0 ? 
        <Login {...props}/> 
      : page < 10 ?
        <Process {...props} reset={reset}/>
      :
        <Results {...props} reset={reset}/>}
    </div>
  )
}

export default Main