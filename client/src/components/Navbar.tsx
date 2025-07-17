import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChartBarStacked } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const isLinkActive = (path: string) => {
    return path === "/" ? location === path : location.startsWith(path);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-violet-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <ChartBarStacked className="text-violet-100" size={24} />
              <span className="font-poppins font-bold text-xl">SortViz</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`nav-link font-medium ${isLinkActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              href="/algorithm/bubble-sort" 
              className={`nav-link font-medium ${isLinkActive('/algorithm') ? 'active' : ''}`}
            >
              Algorithms
            </Link>
            <Link 
              href="/visualizer" 
              className={`nav-link font-medium ${isLinkActive('/visualizer') ? 'active' : ''}`}
            >
              Visualizer
            </Link>
            <Link 
              href="/about" 
              className={`nav-link font-medium ${isLinkActive('/about') ? 'active' : ''}`}
            >
              About
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu} 
              className="text-white focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden bg-violet-700 pb-4 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 space-y-2 pt-2">
          <Link 
            href="/" 
            className="block py-2 px-4 font-medium hover:bg-violet-500 rounded-md"
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link 
            href="/algorithm/bubble-sort" 
            className="block py-2 px-4 font-medium hover:bg-violet-500 rounded-md"
            onClick={closeMobileMenu}
          >
            Algorithms
          </Link>
          <Link 
            href="/visualizer" 
            className="block py-2 px-4 font-medium hover:bg-violet-500 rounded-md"
            onClick={closeMobileMenu}
          >
            Visualizer
          </Link>
          <Link 
            href="/about" 
            className="block py-2 px-4 font-medium hover:bg-violet-500 rounded-md"
            onClick={closeMobileMenu}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
