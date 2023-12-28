import React, { useEffect, useState } from 'react'
import './Results.css';
import { MainProps } from '../Main'
import { animals, colors, names } from '../../../utils/Constants';
import { useTranslation } from 'react-i18next';
import { PolarArea } from 'react-chartjs-2';
import { Chart, ChartOptions, RadialLinearScale, ArcElement } from 'chart.js'

Chart.register(RadialLinearScale);
Chart.register(ArcElement);

const Results: React.FC<MainProps> = ( props ) => {

  const { t } = useTranslation();
  // chart config
  const scores = names.map(n => props.score[n as keyof typeof props.score]);
  const chartData = {
    labels: names.map(n => t(`title_${(n)}`)),
    datasets: [
      {
        data: scores,
        backgroundColor: colors.map(c => c + '88'),
        hoverBackgroundColor: colors.map(c => c + 'aa'),
        borderColor: '#f7f4ee',
        borderWidth: 1.5,
      },
    ],
  };
  const chartOptions: ChartOptions<'polarArea'> = {
    animation: {
      animateRotate: true,
      animateScale: true
    },
    scales: {
      r: {
        ticks: {
          display: false,
          stepSize: 1,
        },
        grid: {
          color: '#ccc'
        },
        pointLabels: {
          display: true,
          centerPointLabels: true,
          font: {
            size: 9
          },
        },
      }
    },
  };
  const [average, setAverage] = useState<number[]>([-1, -1, -1]);
  const [animal, setAnimal] = useState<{ type: string, score: number[], img: string }>({ type: '', score: [], img: '' });
  const [isReseting, setIsReseting] = useState(false);

  useEffect(() => {
    // calculate the score
    const averageScore = [
      scores.slice(0, 3).reduce((sum: number, v: number) => sum + v, 0) / 3 > 3 ? 1 : 0,
      scores.slice(3, 6).reduce((sum: number, v: number) => sum + v, 0) / 3 > 3 ? 1 : 0,
      scores.slice(6, 9).reduce((sum: number, v: number) => sum + v, 0) / 3 > 3 ? 1 : 0,
    ];
    setAverage(averageScore);
    setAnimal(animals.find(a => a.score.filter((s, i) => s === averageScore[i]).length === 3) || { type: '', score: [], img: '' });
    // event listener
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.popup') && !target.closest('.fa-rotate-right')) setIsReseting(false);
  }

  return (
    <>
      <div className='app results absolute' style={{ overflow: 'auto' }}>
        
        {/* main components */}
        <div className='results-screen absolute' style={{ top: 0, left: 0, width: '100%', height: '100%' }}>
          {/* top section */}
          <div className='top-section flex align-center'>
            {/* <i className='fa-solid fa-bars'/> */}
            <i className='fa-solid fa-rotate-right' onClick={() => setIsReseting(true)}/>
          </div>
          {/* pie chart */}
          <div className='center' style={{ marginTop: 24 }}>
            <div className='wheel-container'>
              <div style={{ textAlign: 'center', fontWeight: 600 }}>The Wheel of Happiness</div>
              <PolarArea data={chartData} title='The Wheel of Happiness' options={chartOptions}/>
            </div>
          </div>
          {/* animal */}
          <div style={{ fontSize: 18, fontWeight: 600, textAlign: 'center' }}><span style={{ fontWeight: 400, fontSize: 16 }}>你是</span> {t(animal.type)}</div>
          <div className='center'>
            <img className='animal-img' alt='' style={{ margin: '8px 0' }} src={`./images/${animal.img}`}/>
          </div>
          <div style={{ margin: '12px 24px', textAlign: 'center' }}>{t(`${animal.type}_description`)}</div>
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

export default Results