import axios from 'axios'
const URL = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) => {
    let changableURL = URL

    if (country) {
        changableURL = `${URL}/countries/${country}`
    }
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changableURL)


        return {
            confirmed,
            recovered,
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
            date: dailyData.reportedDate,

        }))

        return modifiedData;


    } catch (error) {
        console.log(error)
    }

}
export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${URL}/countries`)
        return countries.map((country) => country.name)

    } catch (error) {
        console.log(error)
    }

}