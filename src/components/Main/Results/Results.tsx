import React from 'react'
import './Results.css';
import { MainProps } from '../Main'
import { names } from '../../../utils/Constants';

const Results: React.FC<MainProps> = ( props ) => {
  return (
    <div className='app results absolute' style={{ overflow: 'auto' }}>
      
      {/* main components */}
      <div className='results-screen absolute' style={{ top: 0, left: 0, width: '100%', height: '100%', background: '#ffffffdd' }}>
        {/* top section */}
        <div className='top-section flex align-center'>
          <i className='fa-solid fa-bars'/>
          <i className='fa-solid fa-rotate-right' style={{ marginLeft: 8 }}/>
        </div>
        {/* pie chart */}
        <div className='center' style={{ marginTop: 24 }}>
          <figure className='wheel'>
            {names.map((name, i) => {
              return (
                <circle></circle>
              )
            })}
          </figure>
        </div>

      </div>

    </div>
  )
}

export default Results