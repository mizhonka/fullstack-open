import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res)=>{
    res.send(patientService.getAll());
});

router.post('/', (req, res)=>{
    const {name, dateOfBirth, ssn, gender, occupation} = req.body;
    const addedPatient = patientService.addNew({
        name: name,
        dateOfBirth: dateOfBirth,
        ssn: ssn,
        gender: gender,
        occupation: occupation
    });
    res.json(addedPatient);
});

export default router;
