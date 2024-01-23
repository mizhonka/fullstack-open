import Header from "./components/header"
import Content from "./components/content"
import Total from "./components/total"
import Course from "./components/course"

const App = () => {
  const courses=[
    Course.course1,
    Course.course2
  ]
  return (
    <div>
      {courses.map(course=>
        <div key={course.id}>
          <Header course={course}/>
          <Content course={course}/>
          <Total course={course}/>
        </div>)}
    </div>
  )
}

export default App
