import { NonSensitiveDiaryEntry } from "../types";

const Entry=({entry}:{entry: NonSensitiveDiaryEntry})=>{
    return (
        <div>
            <h3>{entry.date}</h3>
            <ul>
                <li>visibility: {entry.visibility}</li>
                <li>weather: {entry.weather}</li>
            </ul>
        </div>
    )
}

export default Entry;
