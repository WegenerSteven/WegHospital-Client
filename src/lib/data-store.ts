// Simple data storage for patients only
export interface PatientData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
}

// In-memory storage
export let patients: PatientData[] = [];

// Helper functions for managing patients
export const addPatient = (patient: Omit<PatientData, 'id'>): PatientData => {
  const newPatient = {
    ...patient,
    id: patients.length + 1,
  };
  patients.push(newPatient);
  return newPatient;
};

export const getPatients = (): PatientData[] => patients;

// Delete patient by ID
export const deletePatient = (id: number): boolean => {
  const index = patients.findIndex(patient => patient.id === id);
  if (index !== -1) {
    patients.splice(index, 1);
    return true;
  }
  return false;
};

// Update patient by ID
export const updatePatient = (id: number, updatedData: Partial<Omit<PatientData, 'id'>>): PatientData | null => {
  const index = patients.findIndex(patient => patient.id === id);
  if (index !== -1) {
    patients[index] = { ...patients[index], ...updatedData };
    return patients[index];
  }
  return null;
};

// Get patient by ID
export const getPatientById = (id: number): PatientData | null => {
  return patients.find(patient => patient.id === id) || null;
};

// Add some sample patient data
addPatient({
  firstName: 'Alice',
  lastName: 'Brown',
  email: 'alice.brown@email.com',
  phone: '+1-555-123-4567',
  dateOfBirth: '1990-05-15',
  gender: 'Female',
  address: '123 Main St, City, State 12345',
});

addPatient({
  firstName: 'Bob',
  lastName: 'Wilson',
  email: 'bob.wilson@email.com',
  phone: '+1-555-987-6543',
  dateOfBirth: '1985-08-22',
  gender: 'Male',
  address: '456 Oak Ave, City, State 54321',
});