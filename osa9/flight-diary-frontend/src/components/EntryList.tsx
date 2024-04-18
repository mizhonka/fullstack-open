import { NonSensitiveDiaryEntry } from "../types"
import Entry from "./Entry"

const EntryList = ({entries}:{entries: NonSensitiveDiaryEntry[]})=>{
    const mapped = entries.map((e,i) => <Entry key={i} entry={e}/>)

    return (
        <div>
            <h2>Diary entries</h2>
            {mapped}
        </div>
    )
}

export default EntryList;
