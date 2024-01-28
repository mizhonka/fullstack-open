import Person from "./Person"

const Content=({persons})=>{
    return(
        <>
        {persons.map(person=><Person key={person.name} person={person}/>)}
        </>
    )
}

export default Content
