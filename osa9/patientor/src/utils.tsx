import { Patient, Gender, Entry } from './types';

const isString=(text: unknown):text is string=>{
    return typeof text === 'string' || text instanceof String;
};

const isDate=(date: string):boolean=>{
    return Boolean(Date.parse(date));
};

const isGender=(param: string):param is Gender=>{
    return Object.values(Gender).map(v=>v.toString()).includes(param);
};

const parseName=(name: unknown):string=>{
    if(!isString(name)){
        throw new Error('Incorrect name: ' + name);
    }

    return name;
};

const parseId=(id: unknown):string=>{
    if(!isString(id)){
        throw new Error('Incorrect id: ' + id);
    }

    return id;
};

const parseDateOfBirth=(dateOfBirth: unknown):string=>{
    if( !isString(dateOfBirth) || !isDate(dateOfBirth)){
        throw new Error('Incorrect date of birth: ' + dateOfBirth);
    }

    return dateOfBirth;
};

const parseSsn=(ssn: unknown):string=>{
    if(!isString(ssn)){
        throw new Error('Incorrect social security number: ' + ssn);
    }

    return ssn;
};

const parseOccupation=(occupation: unknown):string=>{
    if(!isString(occupation)){
        throw new Error('Incorrect occupation: ' + occupation);
    }

    return occupation;
};

const parseGender=(gender: unknown):Gender=>{
    if(!isString(gender) || !isGender(gender)){
        throw new Error('Incorrect gender: ' + gender);
    }

    return gender;
};

const parseEntries=(entries: unknown):Entry[]=>{
    if(!Array.isArray(entries)){
        throw new Error('Incorrect entries: ' + entries);
    }

    return entries;
};

const toPatient = (object:unknown): Patient => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }

      if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object
      && 'id' in object && 'entries' in object)  {
        const patient: Patient = {
          id: parseId(object.id),
          name: parseName(object.name),
          dateOfBirth: parseDateOfBirth(object.dateOfBirth),
          ssn: parseSsn(object.ssn),
          gender: parseGender(object.gender),
          occupation: parseOccupation(object.occupation),
          entries: parseEntries(object.entries)
        };

        return patient;
      }

      throw new Error('Incorrect data: some fields are missing');
};

export default toPatient;
