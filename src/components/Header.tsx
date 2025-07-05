import { Link } from '@tanstack/react-router'
import { Heart, Menu, X, LogOut, User } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link to='/' className='flex items-center text-gray-800'>
              <Heart className='h-8 w-8 text-red-500 mr-2' />
              <span className="font-bold text-xl">WegHospital</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className='hidden md:flex md:items-center md:space-x-8'>
            <Link
              to='/'
              className='text-gray-600 hover:text-gray-900 font-medium transition-colors'
              activeProps={{ className: 'text-blue-600' }}
            >
              Home
            </Link>
            <Link
              to='/dashboard'
              className='text-gray-600 hover:text-gray-900 font-medium transition-colors'
              activeProps={{ className: 'text-blue-600' }}
            >
              Dashboard
            </Link>
            <Link
              to='/about'
              className='text-gray-600 hover:text-gray-900 font-medium transition-colors'
              activeProps={{ className: 'text-blue-600' }}
            >
              About Us
            </Link>
            <Link
              to='/contact'
              className='text-gray-600 hover:text-gray-900 font-medium transition-colors'
              activeProps={{ className: 'text-blue-600' }}
            >
              Contact
            </Link>
          </nav>
          
          {/* Desktop auth buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {user?.role}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login"><Button size="lg">Sign In</Button></Link>
                <Link to="/register"><Button variant="outline" size="lg">Create Account</Button></Link>
              </>
            )}
          </div>



          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className='md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900'
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden border-t border-gray-200 py-4'>
            <div className='space-y-4'>
              <Link
                to='/'
                className='block text-gray-600 hover:text-gray-900 font-medium'
                activeProps={{ className: 'text-blue-600' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to='/dashboard'
                className='block text-gray-600 hover:text-gray-900 font-medium'
                activeProps={{ className: 'text-blue-600' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to='/about'
                className='block text-gray-600 hover:text-gray-900 font-medium'
                activeProps={{ className: 'text-blue-600' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to='/contact'
                className='block text-gray-600 hover:text-gray-900 font-medium'
                activeProps={{ className: 'text-blue-600' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Mobile auth buttons */}
              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 px-4">
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {user?.firstName} {user?.lastName}
                    </span>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {user?.role}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={logout}
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button size="lg" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outline" size="lg" className="w-full">
                      Create Account
                    </Button>
                  </Link>
                </>
              )}
            </div>

          </div>
        )}
      </div>
    </header>
  )
}
