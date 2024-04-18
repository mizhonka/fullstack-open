import { NonSensitiveDiaryEntry } from "../types"
import { useState, useEffect } from "react";
import diaryService from '../services/diaries'
import Entry from "./Entry"

const EntryList = ()=>{
    const [entries, setEntries]=useState<NonSensitiveDiaryEntry[]>([]);

    useEffect(()=>{
        diaryService.getAll().then(data=>setEntries(data));
    }, [])

    const mapped = entries.map((e,i) => <Entry key={i} entry={e}/>)

    return (
        <div>
            <h2>Diary entries</h2>
            {mapped}
        </div>
    )
}

export default EntryList;
