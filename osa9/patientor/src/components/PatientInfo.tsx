import { useParams } from "react-router-dom";
import { Patient, Diagnosis } from "../types";
import { Gender } from "../types";
import EntryDetails from "./EntryDetails";
import toPatient from "../utils";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

interface Props{
    patients: Patient[];
    diagnoses: Diagnosis[]
}

const PatientInfo=({patients, diagnoses}: Props)=>{
    const found = patients.find(p=>p.id===useParams().id);
    const patient = toPatient(found);

    const getIcon=(g: Gender)=>{
        switch(g){
            case Gender.Female:
                return <FemaleIcon/>;
            case Gender.Male:
                return <MaleIcon/>;
            case Gender.Other:
                return <TransgenderIcon/>;
        }
    };

    return (
        <div>
            <h3>{patient.name} {getIcon(patient.gender)}</h3>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <b>entries</b>
            {patient.entries.map((e, i)=><EntryDetails key={i} entry={e} diagnoses={diagnoses}/>)}
        </div>
    );
};

export default PatientInfo;
