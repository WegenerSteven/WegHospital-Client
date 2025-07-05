import type { Patient, CreatePatientDto } from "@/types/index"
import type { Doctor, CreateDoctorDto } from '@/types/index';
import type { Profile, CreateProfileDto } from '@/types/index';
import type { Appointment, CreateAppointmentDto } from '@/types/index';

// API base URL
const API_BASE_URL = 'http://localhost:3001/api/v1';

//helper function to get auth headers
const getAuthHeaders =()=>{
  const token = localStorage.getItem('auth_token');
  return{
    'content-type': 'application/json',
    ...(token ? {Authorization: `Bearer ${token}` } : {}),
  }
}

// Generic API handler
export async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  //merge headers with auth headers
  const config: RequestInit={
    headers:{
      ...getAuthHeaders(),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  
  // Handle 401 Unauthorized
  if (response.status === 401) {
    console.warn('Token expired or invalid, redirecting to login');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
    throw new Error('Authentication failed');
  }

  // Handle 403 Forbidden
  if (response.status === 403) {
    console.warn('Access forbidden - insufficient permissions');
    throw new Error('You do not have permission to access this resource');
  }

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `API Error: ${response.status} ${response.statusText}`;
    
    try {
      const errorData = JSON.parse(errorText);
      errorMessage = errorData.message || errorMessage;
    } catch {
      // If not JSON, use response text
      errorMessage = errorText || errorMessage;
    }
    
    console.error('API Error:', errorMessage);
    throw new Error(errorMessage);
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
      method: 'PATCH', // Changed from 'UPDATE' to 'PATCH'
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
