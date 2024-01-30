import { useState, useEffect } from 'react'
import countryService from './services/countries'
import SearchField from './components/SearchField'
import Content from './components/Content'

const App=()=> {
  const [search, setSearch]=useState('')
  const [countries, setCountries]=useState([])

  useEffect(()=>{
    countryService
      .getAll()
      .then(initial=>setCountries(initial))
  }, [])

  const handleSearchChange=(event)=>{
    setSearch(event.target.value)
  }

  const searchFilter=(country)=>{
    const reg=new RegExp(`\S*${search}\S*`,'i')
    return reg.test(country.name.common)
  }

  const filtered=()=>{
    return countries.filter(searchFilter)
  }

  const showPage=(country)=>{
    setSearch(country)
  }

  return(
    <>
      <SearchField search={search} handleSearchChange={handleSearchChange}/>
      <Content countries={filtered()} showPage={showPage}/>
    </>
  )
}

export default App
