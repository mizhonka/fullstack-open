const CountryInfo=({country})=>{
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

export default CountryInfo
