export interface PatientFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
}
// Interface for doctor registration form data
export interface DoctorFormData{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    specialty: string;
    yearsOfExperience: number;
    password: string;    
    // confirmPassword: string;
    status?: boolean; // Optional, defaults to true
}

export interface Doctor {
  doctorId: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  specialty: string
  yearsOfExperience: number
  status: boolean
}

//interface for Admin registration form data
export interface AdminFormData {
  username: string;
  password: string;
  email: string;
}

// Interface for appointment data
// (Removed duplicate/partial Appointment interface to resolve conflict)

// Patient API
export interface Patient {
  patientId: number;
  dateOfAdmission: string;
  dateOfDischarge: string;
  dateOfBirth: string;
  address: string;
  city?: string;
  profile: {
    profileId: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

//patient DTO for creating a new patient
export interface CreatePatientDto {
  dateOfAdmission: string;
  dateOfDischarge?: string;
  dateOfBirth: string;
  address: string;
  city?: string;
  profileId: number;
}

export interface CreateDoctorDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  specialty: string;
  yearsOfExperience: number;
  password: string;
  status?: boolean;
}

//profile interface// Profile API
export interface Profile {
  profileId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProfileDto {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role?: string;
}

// Appointment API
export interface Appointment {
  appointmentId: number;
  patient: Patient;
  doctor: Doctor;
  appointmentDate: string;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentDto {
  patientId: number;
  doctorId: number;
  appointmentDate: string;
  status: string;
  notes?: string;
}