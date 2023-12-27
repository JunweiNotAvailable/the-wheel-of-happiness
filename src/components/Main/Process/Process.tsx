import React, { useEffect, useState } from 'react'
import './Process.css';
import { MainProps } from '../Main'
import { useTranslation } from 'react-i18next';
import { names, wheelOfLifePage, wheelOfLifeScore } from '../../../utils/Constants';
import { Score } from '../../../utils/Interfaces';

const Process: React.FC<MainProps> = ( props ) => {

  const { t } = useTranslation();
  const [isReseting, setIsReseting] = useState(false);
  const scoreOptions = [
    { name: 'sad', img: 'sad.png' }, 
    { name: 'little_sad', img: 'bored.png' }, 
    { name: 'its_ok', img: 'good.png' }, 
    { name: 'good', img: 'joy.png' }, 
    { name: 'happy', img: 'happy.png' } 
  ];

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
  
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.popup') && !target.closest('.fa-rotate-right')) setIsReseting(false);
  }

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
      console.log(props.score)
      if (Object.values(props.score).filter(v => v === 0).length === 0) {
        localStorage.setItem(wheelOfLifePage, `${props.page + 1}`);
        setTimeout(() => props.setPage(props.page + 1), 300);
      }
    }
  }

  return (
    <>
      <div className='main-screen relative'>

        {/* background */}
        <img className='background' alt='' src={`./images/${props.page <= 3 ? 'health.jpg' : props.page <= 6 ? 'relationships.png' : 'work.png'}`}/>

        {/* main components */}
        <div className='progress-screen absolute' style={{ top: 0, left: 0, width: '100%', height: '100%', background: '#ffffffdd' }}>
          {/* top section */}
          <div className='top-section flex align-center'>
            {/* <i className='fa-solid fa-bars'/> */}
            <i className='fa-solid fa-rotate-right' onClick={() => setIsReseting(true)}/>
          </div>
          {/* title */}
          <div className='title' style={{ textAlign: 'center', marginTop: 12 }}>{props.page}. {t(`title_${names[props.page - 1]}`)}</div>
          <div className='description' style={{ textAlign: 'center', margin: '12px 16px', fontSize: 18 }}>{t(`description_${names[props.page - 1]}`)}</div>
          {/* scores */}
          <div className='flex-v' style={{ padding: '8px' }}>
            {scoreOptions.map((option, i) => {
              return (
                <button key={`btn-${i}`} className={`option flex align-center${i + 1 === props.score[names[props.page - 1] as keyof typeof props.score] ? ' selected' : ''}`} onClick={() => handleSelect(i + 1)}>
                  <img alt='' src={`./images/${option.img}`}/>
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

      {/* reset popup */}
      {isReseting && <div className='popup-container'>
        <div className='popup flex-v align-center'>
          <div className='popup-title'>{t('reset')}</div>
          <div className='popup-content' style={{ marginTop: 8 }}>{t('resetDescription')}</div>
          <div className='flex' style={{ marginTop: 24 }}>
            <button className='secondary-button flex-1' onClick={() => setIsReseting(false)}>{t('cancel')}</button>
            <button className='primary-button flex-1' style={{ marginLeft: 8 }} onClick={props.reset}>{t('confirm')}</button>
          </div>
        </div>  
      </div>}
    </>
  )
}

export default Process