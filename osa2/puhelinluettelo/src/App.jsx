import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Add from './components/Add'
import Content from './components/Content'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]=useState('')
  const [filterName, setFilterName]=useState('')

  useEffect(()=>{
    axios
      .get('http://localhost:3001/persons')
      .then(response => {setPersons(response.data)})
  }, [])

  const checkForName=()=>{
    return persons.map(person=>person.name).includes(newName)
  }

  const handleAlert=(event)=>{
    event.preventDefault()
    alert(`${newName} is already added`)
  }

  const addNote=(event)=>{
    event.preventDefault()
    const addedName={
      name:newName,
      number:newNumber
    }
    setPersons(persons.concat(addedName))
    setNewName("")
    setNewNumber("")
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
      <Content persons={filtered()}/>
    </div>
  )

}

export default App
