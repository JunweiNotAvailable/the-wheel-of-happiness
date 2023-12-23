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
      <div className='progress-screen absolute' style={{ top: 0, left: 0, width: '100%', height: '100%', background: '#ffffffdd' }}>
        {/* top section */}
        <div className='top-section flex align-center'>
          <i className='fa-solid fa-bars'/>
          <i className='fa-solid fa-rotate-right' style={{ marginLeft: 8 }}/>
        </div>
        {/* title */}
        <div className='title'>{t('title_body')}</div>
      </div>

    </div>
  )
}

export default Process