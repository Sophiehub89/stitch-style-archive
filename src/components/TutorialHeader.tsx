
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Link } from 'react-router-dom';
import { Tutorial } from '@/types';

interface TutorialHeaderProps {
  tutorial: Tutorial;
  previousTutorial?: Tutorial;
  nextTutorial?: Tutorial;
}

const TutorialHeader: React.FC<TutorialHeaderProps> = ({
  tutorial,
  previousTutorial,
  nextTutorial,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to patterns
          </Button>
        </Link>
        <div className="flex gap-2">
          {previousTutorial && (
            <Link to={`/tutorial/${previousTutorial.slug}`}>
              <Button variant="outline" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
            </Link>
          )}
          {nextTutorial && (
            <Link to={`/tutorial/${nextTutorial.slug}`}>
              <Button variant="outline" size="sm" className="gap-1">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {tutorial.category}
          </Badge>
          {tutorial.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{tutorial.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{tutorial.description}</p>
      </div>
    </div>
  );
};

export default TutorialHeader;
