
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="relative w-24 h-24 animate-float">
            <svg className="text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
              <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
        
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold tracking-tight">Page not found</h2>
        <p className="text-muted-foreground">
          Oops! We couldn't find the pattern you're looking for.
        </p>
        
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link to="/">Go back home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/?category=all">Browse patterns</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
