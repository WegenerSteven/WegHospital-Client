import { Heart, Users, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              About WegHospital
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We are dedicated to revolutionizing healthcare management through innovative 
              technology solutions that connect patients, doctors, and healthcare administrators 
              in a seamless digital ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                To make healthcare accessible, efficient, and patient-centered through 
                cutting-edge technology and compassionate care.
              </p>
              <p className="text-gray-600 mb-6">
                We believe that technology should enhance the human connection in healthcare, 
                not replace it. Our platform is designed to streamline administrative tasks 
                so healthcare professionals can focus on what matters most - patient care.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-blue-600">
                  <Heart className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Patient-Centered</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Award className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Quality Focused</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-4">Our Values</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Compassionate care for every patient</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Innovation in healthcare technology</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Integrity in all our interactions</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Collaboration across healthcare teams</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-blue-200">Making a difference in healthcare every day</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">5+</div>
              <div className="text-blue-200">Years of Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,000+</div>
              <div className="text-blue-200">Patients Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-200">Healthcare Professionals</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-200">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-gray-600">Meet the passionate professionals behind WegHospital</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Sarah Johnson</h3>
              <p className="text-gray-600 mb-2">Chief Medical Officer</p>
              <p className="text-sm text-gray-500">
                15+ years in healthcare administration and patient care
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Michael Chen</h3>
              <p className="text-gray-600 mb-2">Chief Technology Officer</p>
              <p className="text-sm text-gray-500">
                Healthcare technology specialist with 12+ years experience
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Emma Rodriguez</h3>
              <p className="text-gray-600 mb-2">Head of Patient Experience</p>
              <p className="text-sm text-gray-500">
                Dedicated to improving patient satisfaction and care quality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare professionals and patients who trust WegHospital 
            for their medical management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Get Started Today
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
