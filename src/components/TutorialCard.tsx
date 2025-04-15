
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Tutorial } from '@/types';

interface TutorialCardProps {
  tutorial: Tutorial;
}

const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial }) => {
  return (
    <Link to={`/tutorial/${tutorial.slug}`} className="block transform transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <Card className="h-full overflow-hidden border-2 hover:border-primary">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={tutorial.image}
            alt={tutorial.title}
            className="h-full w-full object-cover transition-all hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <div className="mb-2">
            <Badge variant="outline" className="bg-primary/10 text-primary-foreground">
              {tutorial.category}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold leading-tight line-clamp-2 mb-2">{tutorial.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">{tutorial.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex space-x-1">
            {tutorial.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tutorial.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{tutorial.tags.length - 2}
              </Badge>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default TutorialCard;
