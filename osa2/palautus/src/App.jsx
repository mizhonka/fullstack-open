import Header from "./components/header"
import Content from "./components/content"
import Total from "./components/total"

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id:1,
    parts:[
      {
        name: 'Fundamentals of react',
        exercises: 10,
        id:1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id:2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id:3
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App
