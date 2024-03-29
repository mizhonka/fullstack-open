const Add=({nameCheck, handleAlert, addNote, newName,newNumber,handleNoteChange,handleNumberChange})=>{
    return(
        <>
        <form onSubmit={nameCheck ? handleAlert:addNote}>
            <div>
            name: <input value={newName} onChange={handleNoteChange}/>
            </div>
            <div>
            number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
        </>
    )
}

export default Add
