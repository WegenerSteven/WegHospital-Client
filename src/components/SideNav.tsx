import { useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

interface SideNavItem {
    label: string;
    name: string;
    to: string;
}

const SideNavItems: SideNavItem[] = [
    { label: "Dashboard", name: "Dashboard", to: "/dashboard" },
    { label: "Patients", name: "Patients", to: "/dashboard/Patients" },
    { label: "Doctors", name: "Doctors", to: "/dashboard/Doctors" },
    { label: "Appointments", name: "Appointments", to: "/dashboard/appointments" },
    { label: "Admin", name: "Admin", to: "/dashboard/Admin" },
]

const SideNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { location } = useRouterState();

    useEffect(() => {
        setIsOpen(false)
    }, [location.pathname])
    return (
        <>
            {/* mobile toggle button*/}
            <button className="lg:hidden fixed top-4 left-4 z-50 p-2 text-gray-600 hover:text-gray-900 bg-white rounded-md shadow-md" onClick={() => setIsOpen(!isOpen)}>
                <Menu className="h-6 w-6" />
            </button>
            <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky lg:top-0 inset-y-0 left-0 z-40 w-64 bg-white border-r shadow-md lg:shadow-none flex flex-col h-screen lg:h-screen`}>
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-900">Hospital MS</h2>
                </div>
                <nav className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-2">
                        {SideNavItems.map((item) => (
                            <Link key={item.to} to={item.to} className={`block px-4 py-2 rounded hover:bg-blue-500 transition-colors ${location.pathname === item.to ? 'bg-blue-100 font-semibold text-blue-700' : 'text-gray-700 hover:text-white'}`}>{item.name}</Link>
                        ))}
                    </div>
                </nav>
            </aside>
            {/* Overlay for mobile when is open */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden" onClick={() => setIsOpen(false)}></div>
            )}
        </>
    );
}

export default SideNav;
