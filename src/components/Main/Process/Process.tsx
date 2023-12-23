import React, { useEffect, useState } from 'react'
import './Process.css';
import { MainProps } from '../Main'
import { useTranslation } from 'react-i18next';
import { names, wheelOfLifePage, wheelOfLifeScore } from '../../../utils/Constants';
import { Score } from '../../../utils/Interfaces';

const Process: React.FC<MainProps> = ( props ) => {

  const { t } = useTranslation();
  const scoreOptions = [
    { name: 'sad', img: 'sad.png' }, 
    { name: 'little_sad', img: 'bored.png' }, 
    { name: 'its_ok', img: 'good.png' }, 
    { name: 'good', img: 'joy.png' }, 
    { name: 'happy', img: 'happy.png' } 
  ];

  // select an option
  const handleSelect = (score: number) => {
    // select option then go to next page
    const newScore: Score = { ...props.score, [names[props.page - 1]]: score };
    localStorage.setItem(wheelOfLifeScore, JSON.stringify(newScore));
    props.setScore(newScore);
    setTimeout(() => goToNextPage(), 10);
  }

  // go to next page
  const goBack = () => {
    localStorage.setItem(wheelOfLifePage, `${props.page - 1}`);
    setTimeout(() => props.setPage(props.page - 1), 300);
  }

  // go to next page
  const goToNextPage = () => {
    if (props.page < 9) { // simply go to next page
      localStorage.setItem(wheelOfLifePage, `${props.page + 1}`);
      setTimeout(() => props.setPage(props.page + 1), 300);
    } else { // check if completed or not
      
    }
  }

  return (
    <div className='main-screen relative'>

      {/* background */}
      <img className='background' src={`./images/${props.page <= 3 ? 'health.jpg' : props.page <= 6 ? 'relationships.png' : 'work.png'}`}/>

      {/* main components */}
      <div className='progress-screen absolute' style={{ top: 0, left: 0, width: '100%', height: '100%', background: '#ffffffdd' }}>
        {/* top section */}
        <div className='top-section flex align-center'>
          <i className='fa-solid fa-bars'/>
          <i className='fa-solid fa-rotate-right' style={{ marginLeft: 8 }}/>
        </div>
        {/* title */}
        <div className='title' style={{ textAlign: 'center', marginTop: 12 }}>{props.page}. {t(`title_${names[props.page - 1]}`)}</div>
        <div className='description' style={{ textAlign: 'center', margin: '12px 16px', fontSize: 18 }}>{t(`description_${names[props.page - 1]}`)}</div>
        {/* scores */}
        <div className='flex-v' style={{ padding: '8px' }}>
          {scoreOptions.map((option, i) => {
            return (
              <button key={`btn-${i}`} className={`option flex align-center${i + 1 === props.score[names[props.page - 1] as keyof typeof props.score] ? ' selected' : ''}`} onClick={() => handleSelect(i + 1)}>
                <img src={`./images/${option.img}`}/>
                {i + 1} {t(option.name)}
              </button>
            )
          })}
        </div>
        {/* buttons */}
        <div className='flex' style={{ padding: 8 }}>
          {props.page > 1 && <button onClick={goBack} className='primary-button' style={{ flex: 1 }}>{t('back')}</button>}
          {<button onClick={goToNextPage} className='primary-button' style={{ flex: 1, marginLeft: props.page > 1 ? 12 : 0, background: (props.page === 9 && Object.values(props.score).filter(v => v === 0).length > 0) ? 'var(--main-color-disabled)' : 'var(--main-color)' }}>{props.page === 9 ? (Object.values(props.score).filter(v => v === 0).length > 0) ? t('not_completed') : t('complete') : t('next')}</button>}
        </div>
      </div>

    </div>
  )
}

export default Process