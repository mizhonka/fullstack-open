import CountryTitle from "./CountryTitle"

const Content=({countries})=>{
    if(countries.length>10){
        return(
            <p>Too many matches, specify an another filter</p>
        )
    }

    if(countries.length===1){
        const country=countries[0]
        const keys=Object.keys(country.languages)
        return(
            <>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <p>{country.flag}</p>
            <h3>Languages</h3>
            <ul>{keys.map(key=><li key={key}>{country.languages[key]}</li>)}</ul>
            </>
        )
    }

    return(
        countries.map(country=><CountryTitle key={country.name.common} country={country}/>)
    )
}

export default Content
