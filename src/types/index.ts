export interface PatientFormData{
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
    confirmPassword: string;
}

//interface for Admin registration form data
export interface AdminFormData{
    username: string;
    password: string;
    email: string;
}