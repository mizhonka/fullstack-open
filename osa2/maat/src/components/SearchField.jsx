const SearchField=({search, handleSearchChange})=>{
    return(
        <>
            <input value={search} onChange={handleSearchChange}/>
        </>
    )
}

export default SearchField
