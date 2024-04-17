import patientData from '../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, PatientSecure, NewPatient } from '../types';

const getAll=(): PatientSecure[]=>{
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({id, name, dateOfBirth, gender, occupation}));
};

const addNew=(patient: NewPatient):Patient=>{
    const id = uuid();
    const newPatient={
        id: id,
        ...patient
    };
    patientData.push(newPatient);
    return newPatient;
};

export default {
    getAll,
    addNew
};
