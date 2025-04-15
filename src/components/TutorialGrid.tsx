
import React from 'react';
import TutorialCard from './TutorialCard';
import { Tutorial } from '@/types';

interface TutorialGridProps {
  tutorials: Tutorial[];
}

const TutorialGrid: React.FC<TutorialGridProps> = ({ tutorials }) => {
  return (
    <div className="masonry-grid">
      {tutorials.map((tutorial) => (
        <div key={tutorial.id} className="masonry-item">
          <TutorialCard tutorial={tutorial} />
        </div>
      ))}
    </div>
  );
};

export default TutorialGrid;
