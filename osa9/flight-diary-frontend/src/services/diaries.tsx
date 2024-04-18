import axios from "axios";
import { NonSensitiveDiaryEntry, DiaryEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll=async()=>{
    const {data}=await axios.get<NonSensitiveDiaryEntry[]>(`${apiBaseUrl}/api/diaries`);

    return data;
}

const createNew=async (object: DiaryEntry)=>{
    const response = await axios.post<DiaryEntry>(`${apiBaseUrl}/api/diaries`, object);
    return response.data;
}

export default {
    getAll,
    createNew
}
