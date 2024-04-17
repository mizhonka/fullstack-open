import patientData from '../data/patients';

import { PatientSecure } from '../types';

const patients:PatientSecure[]=patientData;

const getAll=(): PatientSecure[]=>{
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({id, name, dateOfBirth, gender, occupation}));
};

export default {
    getAll
}
