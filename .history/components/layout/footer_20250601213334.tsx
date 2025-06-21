import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Lab Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IIT</span>
              </div>
              <span className="font-bold text-lg">Research Lab</span>
            </div>
            <p className="text-gray-400 mb-4">
              Advancing the frontiers of science and technology through innovative research at IIT Palakkad.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/people" className="text-gray-400 hover:text-white transition-colors">
                  People
                </Link>
              </li>
              <li>
                <Link href="/publications" className="text-gray-400 hover:text-white transition-colors">
                  Publications
                </Link>
              </li>
              <li>
                <Link href="/instruments" className="text-gray-400 hover:text-white transition-colors">
                  Instruments
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="text-gray-400 hover:text-white transition-colors">
                  Achievements
                </Link>
              </li>
            </ul>
          </div>

          {/* Research Areas */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Research Areas</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Machine Learning</li>
              <li>Computer Vision</li>
              <li>Natural Language Processing</li>
              <li>Robotics</li>
              <li>Artificial Intelligence</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm">IIT Palakkad, Kerala, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm">+91 4923 226 100</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm">research@iitpkd.ac.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} IIT Palakkad Research Lab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
