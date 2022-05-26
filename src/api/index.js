import axios from 'axios'
const URL = 'https://covid19.mathdro.id/api'

export const fetchData = async () => {
    try {
        const { data: { confirmed, recoverd, deaths, lastUpdate } } = await axios.get(URL)


        return {
            confirmed,
            recoverd,
            deaths,
            lastUpdate
        }
    } catch (error) {
    }
}
export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${URL}/daily`)
        
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date : dailyData.reportedDate,
    
        }))
            
        return modifiedData;
        

    } catch (error) {
        
    }
    
}