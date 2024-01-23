const Total=({course})=>{
    const getSum=(total, n)=>{
        return total+n
    }

    return(
        <>
            <b>total {course.parts.map(part=>part.exercises).reduce(getSum)} exercises</b>
        </>
    )
}

export default Total
