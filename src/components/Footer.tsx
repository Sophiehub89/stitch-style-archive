
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col md:flex-row justify-between items-center py-8 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <div className="relative w-8 h-8">
            <svg className="text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
              <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="currentColor"/>
            </svg>
          </div>
          <span className="font-bold">OpenCrochet</span>
        </div>
        
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <Link to="/" className="transition hover:text-primary">
            Home
          </Link>
          <Link to="/?category=all" className="transition hover:text-primary">
            Patterns
          </Link>
          <Link to="/about" className="transition hover:text-primary">
            About
          </Link>
          <Link to="/?tag=Beginner" className="transition hover:text-primary">
            Beginners
          </Link>
        </nav>
        
        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} OpenCrochet. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
