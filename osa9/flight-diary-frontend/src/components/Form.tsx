import { useState } from "react"
import { Weather, Visibility } from "../types";
import {parseWeather , parseVisibility} from '../utils'
import diaryService from '../services/diaries'

const Form = ()=>{
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
    const [weather, setWeather] = useState<Weather>(Weather.Sunny);
    const [comment, setComment] = useState('');

    const visibilityRadio = Object.values(Visibility).map((v, i)=>(
        <div key={i}>
            <input onChange={({target})=>setVisibility(parseVisibility(target.value))}
            type="radio" id={v.toString()} checked={v === visibility} value={v}/>
            <label htmlFor={v.toString()}>{v.toString()}</label>
        </div>
    ))

    const weatherRadio = Object.values(Weather).map((v, i)=>(
        <div key={i}>
            <input onChange={({target})=>setWeather(parseWeather(target.value))}
            type="radio" id={v.toString()} checked={v === weather} value={v}/>
            <label htmlFor={v.toString()}>{v.toString()}</label>
        </div>
    ))

    const addEntry=async (event: React.SyntheticEvent)=>{
        event.preventDefault();
        const initial = await diaryService.getAll();
        const newEntry={
            id: initial.length+1,
            date: date,
            visibility: visibility,
            weather: weather,
            comment: comment
        }
        diaryService.createNew(newEntry)
    }

    return (
        <div>
            <h2>Add new</h2>
            <form onSubmit={addEntry}>
                <div>
                    date: <input type="date" id="date" value={date} onChange={({target})=>setDate(target.value)}/>
                </div>
                    visibility: {visibilityRadio}
                <div>
                    weather: {weatherRadio}
                </div>
                <div>
                    comment: <input type="text" value={comment} onChange={(event)=> setComment(event.target.value)}/>
                </div>
                <button type="submit">add</button>
            </form>
        </div>
    )
}

export default Form;
