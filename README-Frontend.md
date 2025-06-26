# Hospital Management System - Frontend

A modern React.js frontend for the Hospital Management System built with TypeScript and TanStack libraries.

## Features

- ✅ **Authentication System**: Login and registration for Admin, Doctor, and Patient roles
- ✅ **Modern Dashboard**: Overview of system statistics and quick actions
- ✅ **User Management**: Register and view users (Admin, Doctor, Patient)
- ✅ **Patient Management**: View and manage patient records
- ✅ **Doctor Management**: View and manage doctor profiles
- ✅ **Appointment Management**: View and manage appointments
- ✅ **Responsive Design**: Mobile-first design with Tailwind CSS
- ✅ **Form Validation**: Comprehensive form validation with TanStack Form
- ✅ **State Management**: Global state management with TanStack Store
- ✅ **API Integration**: RESTful API integration with TanStack Query
- ✅ **Protected Routes**: Role-based access control

## Tech Stack

- **React.js 19** - UI Library
- **TypeScript** - Type Safety
- **TanStack Router** - File-based routing
- **TanStack Query** - Server state management
- **TanStack Form** - Form management and validation
- **TanStack Store** - Global state management
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible UI components
- **Lucide React** - Icons
- **Vite** - Build tool

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Button, Input, etc.)
│   ├── Dashboard.tsx    # Main dashboard component
│   ├── LoginForm.tsx    # Authentication form
│   ├── RegistrationForm.tsx # User registration form
│   ├── Header.tsx       # Navigation header
│   └── ProtectedRoute.tsx # Route protection wrapper
├── lib/                 # Utility libraries
│   ├── api.ts          # API configuration and endpoints
│   ├── auth-store.ts   # Authentication state management
│   └── utils.ts        # Utility functions
├── routes/             # TanStack Router pages
│   ├── __root.tsx      # Root layout
│   ├── index.tsx       # Home page (redirects to dashboard/login)
│   ├── login.tsx       # Login page
│   ├── register.tsx    # Registration page
│   ├── dashboard.tsx   # Dashboard page
│   ├── patients.tsx    # Patients management page
│   ├── doctors.tsx     # Doctors management page
│   └── appointments.tsx # Appointments management page
└── styles.css          # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- NestJS backend server running (see backend documentation)

### Installation

1. **Clone and navigate to the client directory:**
   ```bash
   cd Client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure API endpoint:**
   
   Update the API base URL in `src/lib/api.ts`:
   ```typescript
   const API_BASE_URL = 'http://localhost:3000'; // Your NestJS server URL
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Access the application:**
   
   Open your browser and navigate to `http://localhost:3001`

## Usage Guide

### 1. User Registration

The system supports three types of user registration:

#### Admin Registration
- Username (required)
- Email (required)
- Password (required)

#### Doctor Registration
- First Name & Last Name (required)
- Specialization (required)
- Email (required)
- Phone Number (required)
- Password (required)

#### Patient Registration
- First Name & Last Name (required)
- Date of Birth (required)
- Email (required)
- Phone Number (required)
- Gender (required)
- Address (required)

### 2. Authentication

- Use the login form with email and password
- System automatically redirects based on authentication status
- JWT tokens are stored securely in localStorage
- Automatic token refresh and session management

### 3. Dashboard Features

**Admin Dashboard:**
- View system statistics (total patients, doctors, appointments)
- Quick action buttons for common tasks
- Recent activity feed
- System status indicators

**Doctor Dashboard:**
- View assigned appointments
- Access patient medical histories
- Manage patient records

**Patient Dashboard:**
- View upcoming appointments
- Access personal medical history
- Update profile information

### 4. Navigation

The header navigation provides access to:
- **Dashboard**: Main overview page
- **Patients**: Patient management (Admin/Doctor access)
- **Doctors**: Doctor management (Admin access)
- **Appointments**: Appointment management
- **Register User**: Add new users to the system

### 5. Data Management

**Patients Page:**
- View all registered patients
- Filter and search functionality
- Patient status indicators

**Doctors Page:**
- View all registered doctors
- Doctor specializations
- Contact information

**Appointments Page:**
- View all appointments
- Appointment status tracking
- Patient-doctor relationships

## API Integration

The frontend communicates with the NestJS backend through RESTful APIs:

### Authentication Endpoints
- `POST /auth/login` - User authentication
- `POST /auth/logout` - User logout

### User Management Endpoints
- `POST /admins` - Register admin
- `POST /doctors` - Register doctor  
- `POST /patients` - Register patient
- `GET /patients` - Get all patients
- `GET /doctors` - Get all doctors

### Data Endpoints
- `GET /appointments` - Get appointments
- `GET /dashboard/stats` - Get dashboard statistics
- `GET /contact-queries` - Get contact queries

## Form Validation

All forms include comprehensive validation:

- **Email validation**: Proper email format
- **Password strength**: Minimum 6 characters
- **Required fields**: All mandatory fields validated
- **Real-time validation**: Immediate feedback
- **Error messaging**: Clear, user-friendly error messages

## State Management

### Authentication State
- User authentication status
- User profile information
- JWT token management
- Automatic session restoration

### API State
- Server data caching with TanStack Query
- Automatic background refetching
- Optimistic updates
- Error handling and retry logic

## Styling and Theming

- **Tailwind CSS**: Utility-first CSS framework
- **Dark mode support**: Automatic theme switching
- **Responsive design**: Mobile-first approach
- **Consistent spacing**: Standardized design system
- **Accessible colors**: WCAG compliant color palette

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run serve

# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format

# Type check
npx tsc --noEmit
```

## Troubleshooting

### Common Issues

1. **API Connection Issues**
   - Verify backend server is running
   - Check API_BASE_URL configuration
   - Ensure CORS is properly configured on backend

2. **Authentication Problems**
   - Clear localStorage and cookies
   - Check JWT token expiration
   - Verify user credentials

3. **Route Navigation Issues**
   - Ensure all routes are properly registered
   - Check protected route configurations
   - Verify authentication state

4. **Form Submission Errors**
   - Check network connectivity
   - Validate form data format
   - Review API response errors

### Development Tips

- Use React DevTools for component debugging
- Use TanStack Query DevTools for API state inspection
- Monitor network requests in browser dev tools
- Check console for JavaScript errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API documentation in the backend
