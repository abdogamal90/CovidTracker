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
} from 'chart.js';
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function Chart() {
  const [DailyData, setDailyData] = useState([])

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData())
    }
    console.log(DailyData)
    fetchAPI();
  }, [])
  return (
    <div className={styles.container}>
      {DailyData[0] ?
        (<Line
          data={{
            labels: DailyData.map(({ date }) => new Date(date).toLocaleDateString()),
            datasets: [{
              data: DailyData.map(({confirmed} ) => confirmed),
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


        />
        ) : null}
    </div>
  )
}

export default Chart;