import SideNav from './SideNav';
import { Outlet } from '@tanstack/react-router';
import ProtectedRoute from './ProtectedRoute';

const DashboardLayout = () => {
    return (
        <ProtectedRoute>
            <div className='flex flex-col lg:flex-row min-h-screen'>
                <SideNav/>
                <main className='flex-1 bg-gray-50 lg:ml-0 pt-16 lg:pt-0'>
                    <Outlet/>
                </main>
            </div>
        </ProtectedRoute>
    );
}

export default DashboardLayout;
