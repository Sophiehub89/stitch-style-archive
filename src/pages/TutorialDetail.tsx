
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllTutorials, getTutorialBySlug } from '@/data/tutorials';
import { Tutorial } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TutorialHeader from '@/components/TutorialHeader';
import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Check } from 'lucide-react';

const TutorialDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [prevTutorial, setPrevTutorial] = useState<Tutorial | undefined>(undefined);
  const [nextTutorial, setNextTutorial] = useState<Tutorial | undefined>(undefined);
  
  useEffect(() => {
    if (!slug) {
      navigate('/');
      return;
    }
    
    const currentTutorial = getTutorialBySlug(slug);
    if (!currentTutorial) {
      navigate('/not-found');
      return;
    }
    
    setTutorial(currentTutorial);
    
    // Set up previous and next tutorials for navigation
    const allTutorials = getAllTutorials();
    const currentIndex = allTutorials.findIndex(t => t.id === currentTutorial.id);
    
    if (currentIndex > 0) {
      setPrevTutorial(allTutorials[currentIndex - 1]);
    } else {
      setPrevTutorial(undefined);
    }
    
    if (currentIndex < allTutorials.length - 1) {
      setNextTutorial(allTutorials[currentIndex + 1]);
    } else {
      setNextTutorial(undefined);
    }
    
    // Scroll to top when tutorial changes
    window.scrollTo(0, 0);
  }, [slug, navigate]);
  
  // Handle search from navbar - redirect to homepage with search query
  const handleSearch = (query: string) => {
    navigate(`/?search=${encodeURIComponent(query)}`);
  };
  
  if (!tutorial) {
    return null; // Or a loading state
  }
  
  return (
    <>
      <SEO
        title={tutorial.title}
        description={tutorial.description}
        type="article"
        image={tutorial.image}
      />
      
      <div className="flex min-h-screen flex-col">
        <Navbar onSearch={handleSearch} />
        
        <main className="flex-1">
          <article className="container py-8">
            <div className="mx-auto max-w-4xl">
              <TutorialHeader
                tutorial={tutorial}
                previousTutorial={prevTutorial}
                nextTutorial={nextTutorial}
              />
              
              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                  <div className="aspect-[16/9] overflow-hidden rounded-lg border">
                    <img
                      src={tutorial.image}
                      alt={tutorial.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    <h2 className="text-2xl font-semibold">Instructions</h2>
                    <ol className="space-y-4 mt-4">
                      {tutorial.instructions.map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                            {index + 1}
                          </span>
                          <p>{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4">Materials</h3>
                      <ul className="space-y-2">
                        {tutorial.materials.map((material, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span>{material}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">Difficulty</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tutorial.tags.filter(tag => 
                          ['Beginner', 'Intermediate', 'Advanced'].includes(tag)
                        ).map(tag => (
                          <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <h3 className="font-semibold text-lg mb-2">Category</h3>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                          {tutorial.category}
                        </span>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <h3 className="font-semibold text-lg mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {tutorial.tags.map(tag => (
                          <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </article>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default TutorialDetail;
