
import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Link to="/" className="mr-4 flex items-center space-x-2">
          <div className="relative w-8 h-8">
            <svg className="text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
              <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="currentColor"/>
            </svg>
          </div>
          <span className="hidden font-bold sm:inline-block">OpenCrochet</span>
        </Link>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/?category=all" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Patterns
          </Link>
          <Link to="/?tag=Beginner" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Beginners
          </Link>
          <Link to="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            About
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patterns..."
              className="w-[200px] sm:w-[300px] pl-8"
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
