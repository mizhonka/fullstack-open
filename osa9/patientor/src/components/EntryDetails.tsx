import WorkIcon from '@mui/icons-material/Work';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red, green, yellow, grey } from '@mui/material/colors';
import { Diagnosis, Entry, HealthCheckRating, SickLeaveDates } from '../types';

const assertNever=(value: never):never=>{
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const BaseInfo=({entry, diagnoses}: Props)=>{
    return (
        <>
            <i>{entry.description}</i>
            <ul>
                {entry.diagnosisCodes?.map((di, i)=>{
                    const diagnosis = diagnoses.find(d=>d.code===di);
                    return (
                        <li key={i}>{diagnosis?.code} {diagnosis?.name}</li>
                    );
                })}
            </ul>
            <p>Diagnose by {entry.specialist}</p>
        </>
    );
};

const RatingIcon=(rating: HealthCheckRating)=>{
    switch(rating){
        case HealthCheckRating.Healthy:
            return <FavoriteIcon sx={{color: green[500]}}/>;
        case HealthCheckRating.LowRisk:
            return <FavoriteIcon sx={{color: yellow[400]}}/>;
        case HealthCheckRating.HighRisk:
            return <FavoriteIcon sx={{color: red[500]}}/>;
        case HealthCheckRating.CriticalRisk:
            return <FavoriteIcon sx={{color: grey[800]}}/>;
        default:
            return assertNever(rating);
    }
};

const SickleaveField=(leave: SickLeaveDates | undefined)=>{
    if(!leave){return null;}

    return (
        <p>Sickleave from {leave.startDate} to {leave.endDate}</p>
    );
};

interface Props{
    entry: Entry,
    diagnoses: Diagnosis[]
}

const EntryDetails=({entry, diagnoses}:Props)=>{
    switch(entry.type){
        case 'HealthCheck':
            return(
                <fieldset>
                    <legend>{entry.date}</legend>
                    <p><HealthAndSafetyIcon/> {RatingIcon(entry.healthCheckRating)}</p>
                    <BaseInfo entry={entry} diagnoses={diagnoses}/>
                </fieldset>
            );
        case 'OccupationalHealthcare':
            return(
                <fieldset>
                    <legend>{entry.date}</legend>
                    <p><WorkIcon/>{entry.employerName}</p>
                    <BaseInfo entry={entry} diagnoses={diagnoses}/>
                    {SickleaveField(entry.sickLeave)}
                </fieldset>
            );
        case 'Hospital':
            return(
                <fieldset>
                    <legend>{entry.date}</legend>
                    <p><LocalHospitalIcon/></p>
                    <BaseInfo entry={entry} diagnoses={diagnoses}/>
                    <p>Discharge {entry.discharge.date}, {entry.discharge.criteria}</p>
                </fieldset>
            );
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;
