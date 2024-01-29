import Person from "./Person"

const Content=({persons, invokeDelete})=>{
    return(
        <>
        {persons.map(person=><Person key={person.name} person={person} invokeDelete={()=>invokeDelete(person.id)}/>)}
        </>
    )
}

export default Content
