import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { BookOpen, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Books', path: '/category/book' },
    { name: 'Notes', path: '/category/notes' },
    { name: 'Past Papers', path: '/category/past_paper' },
    { name: 'Physics', path: '/subject/physics' },
    { name: 'Chemistry', path: '/subject/chemistry' },
    { name: 'Mathematics', path: '/subject/mathematics' }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="text-blue-600 h-6 w-6" />
            <div 
              onClick={() => window.location.href = '/'}
              className="font-bold text-xl text-blue-700 cursor-pointer"
            >
              GHS College
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <div 
                key={link.path} 
                onClick={() => window.location.href = link.path}
                className={`text-gray-700 hover:text-blue-600 font-medium px-2 py-1 cursor-pointer ${
                  isActive(link.path) ? 'text-blue-600 border-b-2 border-blue-600' : ''
                }`}
              >
                {link.name}
              </div>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 bg-gray-50 rounded-lg p-4 shadow-inner">
            {navLinks.map((link) => (
              <div 
                key={link.path}
                className={`block py-2 px-3 rounded mb-1 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium cursor-pointer ${
                  isActive(link.path) ? 'bg-blue-50 text-blue-600' : ''
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  window.location.href = link.path;
                }}
              >
                {link.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
