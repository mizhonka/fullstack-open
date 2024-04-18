import patientData from '../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, PatientSecure, NewPatient } from '../types';

const getAll=(): PatientSecure[]=>{
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({id, name, dateOfBirth, gender, occupation}));
};

const getWithId=(id: string): Patient=>{
    const found = patientData.find(p=>p.id===id);
    if(!found){
        throw new Error(`Patient with id ${id} not found`);
    }
    return found;
};

const addNew=(patient: NewPatient):Patient=>{
    const id = uuid();
    const newPatient={
        id: id,
        ...patient,
        entries: []
    };
    patientData.push(newPatient);
    return newPatient;
};

export default {
    getAll,
    addNew,
    getWithId
};
