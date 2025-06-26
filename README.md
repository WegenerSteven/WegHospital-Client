# WegHospital Frontend

A modern Hospital Management System built with React, TypeScript, and TanStack libraries. This is a learning project designed to demonstrate the use of modern React development tools and practices.

## 🚀 Features

- **Home Page**: Beautiful landing page with healthcare services overview
- **Dashboard**: Admin dashboard with sidebar navigation and healthcare analytics
- **About Us**: Company information and team details
- **Contact**: Contact form with validation using TanStack Form
- **Authentication**: Login and registration forms (Sign In/Sign Up)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean design using Shadcn UI components

## 🛠️ Tech Stack

- **React 19** - Frontend framework
- **TypeScript** - Type safety
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Server state management
- **TanStack Form** - Form handling and validation
- **TanStack Store** - Client state management
- **Tailwind CSS** - Styling
- **Shadcn UI** - UI component library
- **Lucide React** - Icons
- **Vite** - Build tool

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Hospital-sys/Client
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # Shadcn UI components
│   ├── Header.tsx      # Navigation header
│   ├── HomePage.tsx    # Landing page
│   ├── SimpleDashboard.tsx  # Admin dashboard
│   ├── AboutPage.tsx   # About us page
│   ├── ContactPage.tsx # Contact form
│   ├── LoginForm.tsx   # Login form
│   └── RegistrationForm.tsx # Registration form
├── routes/             # TanStack Router routes
│   ├── __root.tsx     # Root layout
│   ├── index.tsx      # Home route
│   ├── dashboard.tsx  # Dashboard route
│   ├── about.tsx      # About route
│   ├── contact.tsx    # Contact route
│   ├── login.tsx      # Login route
│   └── register.tsx   # Register route
├── lib/               # Utilities and stores
│   ├── utils.ts       # Helper functions
│   ├── api.ts         # API functions
│   └── auth-store.ts  # Authentication store
└── styles.css         # Global styles
```

## 🎯 Learning Objectives

This project demonstrates:

1. **TanStack Router**: File-based routing with type safety
2. **TanStack Query**: Data fetching and caching
3. **TanStack Form**: Form validation and submission
4. **TanStack Store**: Global state management
5. **TypeScript**: Strong typing and interfaces
6. **Tailwind CSS**: Utility-first styling
7. **Component Architecture**: Reusable React components
8. **Responsive Design**: Mobile-first approach

## 📱 Pages Overview

### Home Page (`/`)
- Hero section with call-to-action buttons
- Features showcase
- Statistics section
- Footer with company information

### Dashboard (`/dashboard`)
- Sidebar navigation
- Statistics cards (Patients, Doctors, Appointments)
- Recent patients and appointments tables
- Quick action buttons
- Responsive mobile design

### About Us (`/about`)
- Company mission and values
- Team member profiles
- Impact statistics
- Call-to-action section

### Contact (`/contact`)
- Contact information with icons
- Contact form with validation
- Emergency notice
- Form submission feedback

### Authentication
- **Login** (`/login`): User authentication form
- **Register** (`/register`): User registration with role selection

## 🔧 Available Scripts

```bash
# Development
pnpm run dev          # Start development server
pnpm run build        # Build for production
pnpm run preview      # Preview production build

# Code Quality
pnpm run lint         # Run ESLint
pnpm run format       # Format code with Prettier
pnpm run check        # Check TypeScript types

# Testing
pnpm run test         # Run tests
```

## 🎨 UI Components

The project uses Shadcn UI components:
- Button
- Input
- Form elements
- Card layouts
- Navigation components

## 🌟 Key Features for Demo

### TanStack Router
- File-based routing system
- Type-safe navigation
- Active link styling
- Mobile navigation menu

### TanStack Form
- Form validation
- Real-time error handling
- Type-safe form fields
- Submission feedback

### TanStack Query
- Mock data fetching
- Loading states
- Error handling
- Data caching

### TanStack Store
- Authentication state
- User session management
- Reactive state updates

## 🚧 Current Status

This is a simplified version designed for learning and demonstration:
- Authentication is currently mocked for development
- API calls use mock data
- Focus on frontend functionality and TanStack library usage
- Progressive enhancement approach

## 🔜 Next Steps

1. Connect to real backend API
2. Implement proper authentication
3. Add more dashboard features
4. Include data visualization charts
5. Add patient and doctor management pages
6. Implement appointment scheduling

## 👥 For Trainers/Students

This project is structured to demonstrate:
- Modern React development patterns
- TypeScript integration
- TanStack ecosystem usage
- Component-based architecture
- Responsive design principles
- Form handling best practices

Each component is well-commented and follows React best practices for educational purposes.

---

Built with ❤️ for learning React and TanStack libraries



## Routing
This project uses [TanStack Router](https://tanstack.com/router). The initial setup is a file based router. Which means that the routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add another a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from "@tanstack/react-router";
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you use the `<Outlet />` component.

Here is an example layout that includes a header:

```tsx
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Link } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
```

The `<TanStackRouterDevtools />` component is not required so you can remove it if you don't want it in your layout.

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).


## Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
const peopleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/people",
  loader: async () => {
    const response = await fetch("https://swapi.dev/api/people");
    return response.json() as Promise<{
      results: {
        name: string;
      }[];
    }>;
  },
  component: () => {
    const data = peopleRoute.useLoaderData();
    return (
      <ul>
        {data.results.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    );
  },
});
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

### React-Query

React-Query is an excellent addition or alternative to route loading and integrating it into you application is a breeze.

First add your dependencies:

```bash
pnpm add @tanstack/react-query @tanstack/react-query-devtools
```

Next we'll need to create a query client and provider. We recommend putting those in `main.tsx`.

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ...

const queryClient = new QueryClient();

// ...

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
```

You can also add TanStack Query Devtools to the root route (optional).

```tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools />
    </>
  ),
});
```

Now you can use `useQuery` to fetch your data.

```tsx
import { useQuery } from "@tanstack/react-query";

import "./App.css";

function App() {
  const { data } = useQuery({
    queryKey: ["people"],
    queryFn: () =>
      fetch("https://swapi.dev/api/people")
        .then((res) => res.json())
        .then((data) => data.results as { name: string }[]),
    initialData: [],
  });

  return (
    <div>
      <ul>
        {data.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

You can find out everything you need to know on how to use React-Query in the [React-Query documentation](https://tanstack.com/query/latest/docs/framework/react/overview).

## State Management

Another common requirement for React applications is state management. There are many options for state management in React. TanStack Store provides a great starting point for your project.

First you need to add TanStack Store as a dependency:

```bash
pnpm add @tanstack/store
```

Now let's create a simple counter in the `src/App.tsx` file as a demonstration.

```tsx
import { useStore } from "@tanstack/react-store";
import { Store } from "@tanstack/store";
import "./App.css";

const countStore = new Store(0);

function App() {
  const count = useStore(countStore);
  return (
    <div>
      <button onClick={() => countStore.setState((n) => n + 1)}>
        Increment - {count}
      </button>
    </div>
  );
}

export default App;
```

One of the many nice features of TanStack Store is the ability to derive state from other state. That derived state will update when the base state updates.

Let's check this out by doubling the count using derived state.

```tsx
import { useStore } from "@tanstack/react-store";
import { Store, Derived } from "@tanstack/store";
import "./App.css";

const countStore = new Store(0);

const doubledStore = new Derived({
  fn: () => countStore.state * 2,
  deps: [countStore],
});
doubledStore.mount();

function App() {
  const count = useStore(countStore);
  const doubledCount = useStore(doubledStore);

  return (
    <div>
      <button onClick={() => countStore.setState((n) => n + 1)}>
        Increment - {count}
      </button>
      <div>Doubled - {doubledCount}</div>
    </div>
  );
}

export default App;
```

We use the `Derived` class to create a new store that is derived from another store. The `Derived` class has a `mount` method that will start the derived store updating.

Once we've created the derived store we can use it in the `App` component just like we would any other store using the `useStore` hook.

You can find out everything you need to know on how to use TanStack Store in the [TanStack Store documentation](https://tanstack.com/store/latest).

# Demo files

Files prefixed with `demo` can be safely deleted. They are there to provide a starting point for you to play around with the features you've installed.

# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).
