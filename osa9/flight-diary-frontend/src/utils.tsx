import {Weather , Visibility} from './types';

const isString=(text: unknown):text is string=>{
    return typeof text === 'string' || text instanceof String;
};

const isWeather=(param: string):param is Weather=>{
    return Object.values(Weather).map(v=>v.toString()).includes(param);
};

const isVisibility=(param: string):param is Visibility=>{
    return Object.values(Visibility).map(v=>v.toString()).includes(param);
};

export const parseWeather=(weather: unknown):Weather=>{
    if(!isString(weather) || !isWeather(weather)){
        throw new Error('Incorrect weather: ' + weather);
    }

    return weather;
}

export const parseVisibility=(visibility: unknown):Visibility=>{
    if(!isString(visibility) || !isVisibility(visibility)){
        throw new Error('Incorrect weather: ' + visibility);
    }

    return visibility;
}
