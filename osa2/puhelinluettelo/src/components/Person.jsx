const Person=({person, invokeDelete})=>{
    return(
        <>
        <p>{person.name} {person.number} <button onClick={invokeDelete}>delete</button></p>
        </>
    )
}

export default Person
