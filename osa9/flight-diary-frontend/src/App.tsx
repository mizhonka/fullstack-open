import { useEffect, useState } from 'react';
import diaryService from './services/diaries';
import { NonSensitiveDiaryEntry } from './types';
import EntryList from './components/EntryList';

function App() {
    const [entries, setEntries]=useState<NonSensitiveDiaryEntry[]>([]);

    useEffect(()=>{
        diaryService.getAll().then(data=>setEntries(data));
    }, [])

    return (
        <div>
            <EntryList entries={entries}/>
        </div>
    )
}

export default App
