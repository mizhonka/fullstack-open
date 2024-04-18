import { CoursePart } from "../types";
import Part from "./Part";

const Content=({part}: {part: CoursePart})=>{
    return(
        <div>
            <Part part={part}/>
        </div>
    )
}

export default Content;
