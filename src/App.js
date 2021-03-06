import React from 'react';
import { Cards, Chart, CountryPicker } from './components'
import styles from './App.module.css';
import { fetchData } from './api';
import coronaImage from './images/image.png'
import { width } from '@mui/system';
class App extends React.Component {
  state = {
    data: {},
    countries: ''
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData })
  }
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country)
    this.setState({data : fetchedData, country : country})
  }
  render() {
    const { data,country } = this.state
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} data={data} />
        <Chart data={data} country={country}/>
      </div>
    );
  }

}

export default App;
