import type { Patient, CreatePatientDto } from "@/types/index"
import type { Doctor, CreateDoctorDto } from '@/types/index';
import type { Profile, CreateProfileDto } from '@/types/index';
import type { Appointment, CreateAppointmentDto } from '@/types/index';

// API base URL
const API_BASE_URL = 'http://localhost:3001/api/v1';

export // Generic API handler
  async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const patientApi = {
  getAll: () => apiRequest<Patient[]>('/patients'),
  getById: (id: number) => apiRequest<Patient>(`/patients/${id}`),
  create: (data: CreatePatientDto) => apiRequest<Patient>('/patients', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  update: (id: number, data: Partial<CreatePatientDto>) =>
    apiRequest<Patient>(`/patients/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  delete: (id: number) => apiRequest<void>(`/patients/${id}`, {
    method: 'DELETE',
  }),
};

export const doctorApi = {
  getAll: () => apiRequest<Doctor[]>('/doctors'),
  getById: (id: number) => apiRequest<Doctor>(`/doctors/${id}`),
  create: (data: CreateDoctorDto) => apiRequest<Doctor>('/doctors', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  update: (id: number, data: Partial<CreateDoctorDto>) =>
    apiRequest<Doctor>(`/doctors/${id}`, {
      method: 'UPDATE',
      body: JSON.stringify(data),
    }),

  delete: (id: number) => apiRequest<void>(`/doctors/${id}`, {
    method: 'DELETE',
  }),
};


export const appointmentApi = {
  getAll: () => apiRequest<Appointment[]>('/appointments'),
  getById: (id: number) => apiRequest<Appointment>(`/appointments/${id}`),
  create: (data: CreateAppointmentDto) => apiRequest<Appointment>('/appointments', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  update: (id: number, data: Partial<CreateAppointmentDto>) =>
    apiRequest<Appointment>(`/appointments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (id: number) => apiRequest<void>(`/appointments/${id}`, {
    method: 'DELETE',
  }),
};


export const profileApi = {
  getAll: () => apiRequest<Profile[]>('/profiles'),
  getById: (id: number) => apiRequest<Profile>(`/profiles/${id}`),
  create: (data: CreateProfileDto) => apiRequest<Profile>('/profiles', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: Partial<CreateProfileDto>) =>
    apiRequest<Profile>(`/profiles/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  delete: (id: number) => apiRequest<void>(`/profiles/${id}`, {
    method: 'DELETE',
  }),
};
