export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
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

export type PatientFormValues = Omit<Patient, "id" | "entries">;
export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;
