// Simple seed script to test the backend
const API_BASE = 'http://localhost:3001/api/v1';

// Sample profiles
const profiles = [
  { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'password123', role: 'patient' },
  { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', password: 'password123', role: 'patient' },
  { firstName: 'Dr. Sarah', lastName: 'Johnson', email: 'sarah.johnson@hospital.com', password: 'password123', role: 'doctor' },
  { firstName: 'Dr. Michael', lastName: 'Brown', email: 'michael.brown@hospital.com', password: 'password123', role: 'doctor' },
];

// Sample doctors
const doctors = [
  {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@hospital.com',
    phoneNumber: '+1-555-0101',
    specialty: 'Cardiology',
    yearsOfExperience: 12,
    password: 'password123',
    status: true
  },
  {
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@hospital.com',
    phoneNumber: '+1-555-0102',
    specialty: 'Pediatrics',
    yearsOfExperience: 8,
    password: 'password123',
    status: true
  },
  {
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@hospital.com',
    phoneNumber: '+1-555-0103',
    specialty: 'Dermatology',
    yearsOfExperience: 6,
    password: 'password123',
    status: true
  }
];

async function seedData() {
  try {
    console.log('Starting to seed data...');

    // Create profiles first
    const createdProfiles = [];
    for (const profile of profiles) {
      try {
        const response = await fetch(`${API_BASE}/profiles`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profile)
        });
        
        if (response.ok) {
          const createdProfile = await response.json();
          createdProfiles.push(createdProfile);
          console.log(`Created profile: ${createdProfile.firstName} ${createdProfile.lastName}`);
        } else {
          console.error(`Failed to create profile: ${profile.email}`, await response.text());
        }
      } catch (error) {
        console.error(`Error creating profile ${profile.email}:`, error);
      }
    }

    // Create doctors
    for (const doctor of doctors) {
      try {
        const response = await fetch(`${API_BASE}/doctors`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(doctor)
        });
        
        if (response.ok) {
          const createdDoctor = await response.json();
          console.log(`Created doctor: Dr. ${createdDoctor.firstName} ${createdDoctor.lastName}`);
        } else {
          console.error(`Failed to create doctor: ${doctor.email}`, await response.text());
        }
      } catch (error) {
        console.error(`Error creating doctor ${doctor.email}:`, error);
      }
    }

    // Create patients using the patient profiles
    const patientProfiles = createdProfiles.filter(p => p.role === 'patient');
    
    for (let i = 0; i < patientProfiles.length; i++) {
      const profile = patientProfiles[i];
      const patient = {
        dateOfAdmission: new Date().toISOString().split('T')[0],
        dateOfDischarge: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
        dateOfBirth: new Date(1980 + i * 5, i * 2, 15).toISOString().split('T')[0],
        address: `${123 + i * 100} Main Street, City, State 12345`,
        city: i % 2 === 0 ? 'New York' : 'Los Angeles',
        profileId: profile.profileId
      };

      try {
        const response = await fetch(`${API_BASE}/patients`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(patient)
        });
        
        if (response.ok) {
          const createdPatient = await response.json();
          console.log(`Created patient: ${profile.firstName} ${profile.lastName} (ID: ${createdPatient.patientId})`);
        } else {
          console.error(`Failed to create patient for profile ${profile.profileId}:`, await response.text());
        }
      } catch (error) {
        console.error(`Error creating patient for profile ${profile.profileId}:`, error);
      }
    }

    console.log('Seeding completed!');

  } catch (error) {
    console.error('Error during seeding:', error);
  }
}

// Run the seed function
seedData();
