const CountryTitle=({country, showPage})=>{
    return(
        <p>{country.name.common} <button onClick={()=>showPage(country.name.common)}>show</button></p>
    )
}

export default CountryTitle
