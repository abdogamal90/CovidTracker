import React,{useEffect,useState} from 'react'
import { NativeSelect, FormControl } from '@mui/material'
import styles from './CountryPicker.module.css'
import { countries } from '../../api'

function CountryPicker() {
  const [fetchedCountries, setFetchedCountries] = useState([]);
  useEffect(() => {
    const fetchCountries = async () => {
      setFetchedCountries(await countries)
    }
    fetchCountries();
  },[setFetchedCountries])
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect>
        <option value ='global'>Global</option>
      </NativeSelect>
    </FormControl>
    
  )
}

export default CountryPicker