import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { Gender } from "../types";
import toPatient from "../utils";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientInfo=({patients}: {patients: Patient[]})=>{
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
        </div>
    );
};

export default PatientInfo;
