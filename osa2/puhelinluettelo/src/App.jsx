import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Add from './components/Add'
import Content from './components/Content'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]=useState('')
  const [filterName, setFilterName]=useState('')

  useEffect(()=>{
    personService
      .getAll()
        .then(initial=>setPersons(initial))
  }, [])

  const invokeDelete=id=>{
    if(confirm(`Delete ${persons.filter(person=>person.id===id).map(person=>person.name)}?`)){
      personService
      .deletePerson(id)
      .then(returnedPerson=>setPersons(persons.filter(person=>person.id!==returnedPerson.id)))
    }
  }

  const checkForName=()=>{
    return persons.map(person=>person.name).includes(newName)
  }

  const handleAlert=(event)=>{
    event.preventDefault()
    if(confirm(`${newName} is already added, update number?`)){
      const updated={
        name:newName,
        number:newNumber
      }
      setNewName('')
      setNewNumber('')
      personService
      .update(persons.filter(person=>person.name===newName).map(person=>person.id), updated)
        .then(returnedPerson=>{setPersons(persons.map(person=>person.id!==returnedPerson.id?person:returnedPerson))})
    }
  }

  const addNote=(event)=>{
    event.preventDefault()
    const addedName={
      name:newName,
      number:newNumber,
    }
    personService
      .create(addedName)
        .then(returnedPerson=>{setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")})
  }

  const handleNoteChange=(event)=>{
    setNewName(event.target.value)
  }

  const handleNumberChange=(event)=>{
    setNewNumber(event.target.value)
  }

  const handleFilterChange=(event)=>{
    setFilterName(event.target.value)
  }

  const checkFilter=(person)=>{
    let reg = new RegExp('\S*'+filterName+'\S*', 'i')
    return reg.test(person.name)
  }

  const filtered=()=>{
    return persons.filter(checkFilter)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange}/>
      <h2>Add new</h2>
      <Add nameCheck={checkForName()} handleAlert={handleAlert} addNote={addNote} newName={newName} newNumber={newNumber} handleNoteChange={handleNoteChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Content persons={filtered()} invokeDelete={invokeDelete}/>
    </div>
  )

}

export default App
