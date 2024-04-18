import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res)=>{
    res.send(patientService.getAll());
});

router.get('/:id', (req, res)=>{
    const id = req.params.id;
    try{
        res.json(patientService.getWithId(id));
    }
    catch(error: unknown){
        if(error instanceof Error){
            res.status(400).json({error: error.message});
        }
    }
});

router.post('/', (req, res)=>{
    try{
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addNew(newPatient);
        res.json(addedPatient);
    }
    catch(error:unknown){
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;
