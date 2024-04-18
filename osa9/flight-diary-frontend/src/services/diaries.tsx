import axios from "axios";
import { NonSensitiveDiaryEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll=async()=>{
    const {data}=await axios.get<NonSensitiveDiaryEntry[]>(`${apiBaseUrl}/api/diaries`);
    return data;
}

export default {
    getAll
}
