import React, { useEffect, useState } from 'react';
import { fetchDailyData } from '../../api'
import styles from './Chart.module.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);
function Chart({ data : {confirmed,deaths}, country }) {
  const [DailyData, setDailyData] = useState([])

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData())
    }
    fetchAPI();
  }, [])
  return (
    <div className={styles.container}>
      { country ? 
     
          (
            <Bar
              data={{
                labels: ['Infected', 'Deaths'],
                datasets: [{
                  label: 'People',
                  backgroundColor: [
                    'rgba(0,0,255,0.5)',
                    'rgba(0,255,0,0.5)',
                    'rgba(255,0,0,0.5)',
                  ],
                  data: [confirmed.value, deaths.value],
                }]

              }}
              options={{
                legend: { display: false },
                title: { display: true, text: `Current state in ${country}` },
              }}
            />
        ) :
        (<Line
          data={{
            labels: DailyData.map(({ date }) => new Date(date).toLocaleDateString()),
            datasets: [{
              data: DailyData.map(({ confirmed }) => confirmed),
              label: 'Infected',
              borderColor: '#3333ff',
              fill: true,
            },
            {
              data: DailyData.map(({ deaths }) => deaths),
              label: 'Deaths',
              borderColor: 'red',
              backgroundColor: 'rgba(255,0,0,0.5)',
              fill: true,
            }]
          }}


        />)

      }
    
      
      
    </div>
  )
}

export default Chart;