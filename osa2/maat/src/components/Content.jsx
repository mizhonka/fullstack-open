import CountryTitle from "./CountryTitle"
import CountryInfo from "./CountryInfo"

const Content=({countries, showPage})=>{
    if(countries.length>10){
        return(
            <p>Too many matches, specify an another filter</p>
        )
    }

    if(countries.length===1){
        const country=countries[0]
        return <CountryInfo country={country}/>
    }

    return(
        countries.map(country=><CountryTitle key={country.name.common} country={country} showPage={showPage}/>)
    )
}

export default Content
