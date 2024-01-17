const Header=(props)=>{
    return(
      <>
        <h1>{props.course}</h1>
      </>
    )
}

const Part=(props)=>{
  return(
    <>
      <p>{props.part} {props.exercises}</p>
    </>
  )
}

const Content=(props)=>{
  return(
    <>
      <p>{props.parts[0].name} {props.parts[0].exercises}</p>
      <p>{props.parts[1].name} {props.parts[1].exercises}</p>
      <p>{props.parts[2].name} {props.parts[2].exercises}</p>
    </>
  )
}

const Total=(props)=>{
  return (
    <>
      <p>Number of exercises {props.sum}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts=[
    {
      name: 'Fundamentals of react',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total sum={parts[0].exercises+parts[1].exercises+parts[2].exercises}/>
    </div>
  )
}

export default App
