import { Link } from '@tanstack/react-router'
import { 
  Heart, 
  Users, 
  Calendar, 
  Shield,
  ArrowRight 
} from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">WegHospital</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Your comprehensive hospital management solution. Streamline patient care, 
            manage appointments, and connect with healthcare professionals all in one place.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                View Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose WegHospital?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Patient Management</h3>
            <p className="text-gray-600">
              Efficiently manage patient records, medical history, and treatment plans.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Smart Scheduling</h3>
            <p className="text-gray-600">
              Schedule appointments, manage doctor availability, and reduce wait times.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Secure & Reliable</h3>
            <p className="text-gray-600">
              HIPAA compliant with advanced security measures to protect patient data.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Trusted by Healthcare Professionals
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Patients Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-200">Doctors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <div className="text-blue-200">Appointments</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-200">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-8">
            Join our platform today and experience the future of healthcare management.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/login">
              <Button size="lg">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-6 h-6 text-red-500 mr-2" />
            <span className="text-xl font-semibold">WegHospital</span>
          </div>
          <p className="text-gray-400">
            © 2025, WegHospital. All rights reserved. | Built with React & TanStack
          </p>
        </div>
      </footer>
    </div>
  )
}
