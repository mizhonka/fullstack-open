import { useState } from 'react'

const Header=(props)=><h1>{props.text}</h1>

const Stats=(props)=>{
  if(props.total==0)return <p>No feedback given</p>
  return(
    <>
    <table>
      <tbody>
        <tr>
          <th scope='row'>Good</th>
          <td>{props.good}</td>
        </tr>
        <tr>
          <th scope='row'>Neutral</th>
          <td>{props.neutral}</td>
        </tr>
        <tr>
          <th scope='row'>Bad</th>
          <td>{props.bad}</td>
        </tr>
        <tr>
          <th scope='row'>Total</th>
          <td>{props.total}</td>
        </tr>
        <tr>
          <th scope='row'>Average</th>
          <td>{props.average}</td>
        </tr>
        <tr>
          <th scope='row'>Positive</th>
          <td>{props.positive}%</td>
        </tr>
      </tbody>
    </table>
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
  const [total, setTotal]=useState(0)

  const handleGoodClick=()=>{
    const updatedGood=good+1
    setGood(updatedGood)
    setTotal(updatedGood+neutral+bad)
  }

  const handleNeutralClick=()=>{
    const updatedNeutral=neutral+1
    setNeutral(updatedNeutral)
    setTotal(good+updatedNeutral+bad)
  }

  const handleBadClick=()=>{
    const updatedBad=bad+1
    setBad(updatedBad)
    setTotal(good+neutral+updatedBad)
  }

  const countAverage=()=>{
    return (good*1+bad*-1)/total
  }

  const countPositive=()=>{
    return good/total*100
  }

  return (
    <div>
      <Header text="Give Feedback"/>
      <Button handleClick={handleGoodClick} text="Good"/>
      <Button handleClick={handleNeutralClick} text="Neutral"/>
      <Button handleClick={handleBadClick} text="Bad"/>
      <Header text="Statistics"/>
      <Stats good={good} neutral={neutral} bad={bad} total={total} average={countAverage()} positive={countPositive()}/>
    </div>
  )
}

export default App
