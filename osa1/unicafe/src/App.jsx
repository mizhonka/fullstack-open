import { useState } from 'react'

const Header=(props)=><h1>{props.text}</h1>

const Stats=(props)=>{
  return(
    <>
    <p>Good: {props.good}</p>
    <p>Neutral: {props.neutral}</p>
    <p>Bad: {props.bad}</p>
    </>
  )
}

const Button=(props)=>(
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick=()=>{
    const updatedGood=good+1
    setGood(updatedGood)
  }

  const handleNeutralClick=()=>{
    const updatedNeutral=neutral+1
    setNeutral(updatedNeutral)
  }

  const handleBadClick=()=>{
    const updatedBad=bad+1
    setBad(updatedBad)
  }

  return (
    <div>
      <Header text="Give Feedback"/>
      <Button handleClick={handleGoodClick} text="Good"/>
      <Button handleClick={handleNeutralClick} text="Neutral"/>
      <Button handleClick={handleBadClick} text="Bad"/>
      <Header text="Statistics"/>
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
