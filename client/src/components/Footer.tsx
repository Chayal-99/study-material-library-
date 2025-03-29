import { Link } from 'wouter';
import { 
  BookOpen, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Youtube,
  MessageCircle,
  School
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <School className="text-blue-300 h-6 w-6" />
              <h3 className="font-bold text-xl">GHS Govt. PG College</h3>
            </div>
            <p className="text-blue-200 mb-4">
              Free study materials for BSc students. Access books, notes, and past papers for Mathematics, Physics, and Chemistry.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="bg-blue-800 p-2 rounded-full text-blue-200 hover:text-white hover:bg-blue-700 transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-blue-800 p-2 rounded-full text-blue-200 hover:text-white hover:bg-blue-700 transition">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="bg-blue-800 p-2 rounded-full text-blue-200 hover:text-white hover:bg-blue-700 transition">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 text-blue-100">Study Materials</h4>
            <ul className="space-y-2">
              <li>
                <div 
                  onClick={() => window.location.href = '/'} 
                  className="text-blue-200 hover:text-white transition cursor-pointer"
                >
                  Home
                </div>
              </li>
              <li>
                <div 
                  onClick={() => window.location.href = '/category/book'} 
                  className="text-blue-200 hover:text-white transition cursor-pointer"
                >
                  Books
                </div>
              </li>
              <li>
                <div 
                  onClick={() => window.location.href = '/category/notes'} 
                  className="text-blue-200 hover:text-white transition cursor-pointer"
                >
                  Notes
                </div>
              </li>
              <li>
                <div 
                  onClick={() => window.location.href = '/category/past_paper'} 
                  className="text-blue-200 hover:text-white transition cursor-pointer"
                >
                  Past Papers
                </div>
              </li>
            </ul>
            
            <h4 className="font-semibold text-lg mb-4 mt-6 text-blue-100">BSc Subjects</h4>
            <ul className="space-y-2">
              <li>
                <div 
                  onClick={() => window.location.href = '/subject/physics'}
                  className="text-blue-200 hover:text-white transition cursor-pointer"
                >
                  Physics
                </div>
              </li>
              <li>
                <div 
                  onClick={() => window.location.href = '/subject/chemistry'}
                  className="text-blue-200 hover:text-white transition cursor-pointer"
                >
                  Chemistry
                </div>
              </li>
              <li>
                <div 
                  onClick={() => window.location.href = '/subject/mathematics'}
                  className="text-blue-200 hover:text-white transition cursor-pointer"
                >
                  Mathematics
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 text-blue-100">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="text-blue-300 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                <span className="text-blue-200">principal@ghscollege.edu.in</span>
              </li>
              <li className="flex items-start">
                <Phone className="text-blue-300 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                <span className="text-blue-200">+91 1498 2XXXXX</span>
              </li>
              <li className="flex items-start">
                <MapPin className="text-blue-300 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                <span className="text-blue-200">GHS Govt. PG College Campus, Sujangarh, Rajasthan, India</span>
              </li>
            </ul>
            
            <div className="mt-6 p-3 bg-blue-800 rounded-lg">
              <h5 className="font-medium text-blue-100 mb-1">Join Telegram Channel</h5>
              <p className="text-blue-200 text-sm mb-2">Get notified when new materials are added</p>
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded font-medium">
                Join Now
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-200 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} GHS Govt. PG College, Sujangarh. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-blue-300 hover:text-white text-sm transition">Privacy Policy</a>
            <a href="#" className="text-blue-300 hover:text-white text-sm transition">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
