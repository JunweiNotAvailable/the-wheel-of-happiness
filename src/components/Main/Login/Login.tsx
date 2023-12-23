import React from 'react'
import './Login.css';
import { MainProps } from '../Main'
import { useTranslation } from 'react-i18next';
import { wheelOfLifeName, wheelOfLifePage, wheelOfLifeScore } from '../../../utils/Constants';

const Login: React.FC<MainProps> = ( props ) => {

  const { t } = useTranslation();

  // submit the name and start
  const handleSubmit = () => {
    if (props.name === '') return;
    // store process
    props.setPage(1);
    localStorage.setItem(wheelOfLifeName, props.name);
    localStorage.setItem(wheelOfLifeScore, JSON.stringify(props.score));
    localStorage.setItem(wheelOfLifePage, '1');
  }

  return (
    <div className='main-screen relative'>

      {/* background */}
      <img className='background' alt='' src='./images/hot-air-balloon.png'/>

      {/* input form */}
      <div className='absolute center' style={{ top: 0, left: 0, width: '100%', height: '100%', background: '#ffffffcc' }}>
        <div className='login-form center flex-v'>
          <div className='title flex align-center'><img className='title-image' alt='' src='./logo.png'/>{t('title')}</div>
          <label>{t('my_name')}</label>
          <input value={props.name} onInput={(e: React.ChangeEvent<HTMLInputElement>) => props.setName(e.target.value)}/>
          <button className='primary-button' onClick={handleSubmit}>{t('start')}</button>
        </div>
      </div>

    </div>
  )
}

export default Login