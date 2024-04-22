export interface Diagnosis{
    code: string;
    name: string;
    latin?: string;
}

export interface Patient{
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}

export enum Gender{
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }

export interface SickLeaveDates{
    startDate: string;
    endDate: string;
}

export interface Discharge{
    date: string;
    criteria: string;
}

export interface BaseEntry{
    id: string;
    date: string;
    specialist: string;
    description: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HealthCheckEntry extends BaseEntry{
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry{
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: SickLeaveDates;
}

interface HospitalEntry extends BaseEntry{
    type: 'Hospital';
    discharge: Discharge;
}

export type PatientSecure = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, 'id'>;
export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;
