import React from 'react'
import './Process.css';
import { MainProps } from '../Main'
import { useTranslation } from 'react-i18next';

const Process: React.FC<MainProps> = ( props ) => {

  const { t } = useTranslation();

  return (
    <div className='main-screen relative'>

      {/* background */}
      <img className='background' src={`./images/${props.page <= 3 ? 'health.jpg' : props.page <= 6 ? 'relationships.png' : 'work.png'}`}/>

      {/* main components */}
      <div className='absolute center' style={{ top: 0, left: 0, width: '100%', height: '100%', background: '#ffffffcc' }}>
        <div className=''></div>
      </div>

    </div>
  )
}

export default Process