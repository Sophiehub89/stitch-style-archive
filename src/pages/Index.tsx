
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  getAllTutorials, 
  getAllCategories, 
  getAllTags, 
  getTutorialsByCategory,
  getTutorialsByTag,
  searchTutorials
} from '@/data/tutorials';
import Navbar from '@/components/Navbar';
import FilterBar from '@/components/FilterBar';
import TutorialGrid from '@/components/TutorialGrid';
import Footer from '@/components/Footer';
import { Tutorial, Category } from '@/types';

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [filteredTutorials, setFilteredTutorials] = useState<Tutorial[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    queryParams.get('category')
  );
  const [selectedTag, setSelectedTag] = useState<string | null>(
    queryParams.get('tag')
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  useEffect(() => {
    setTutorials(getAllTutorials());
  }, []);
  
  useEffect(() => {
    // Update URL with current filters
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedTag) params.set('tag', selectedTag);
    
    const newSearch = params.toString();
    const newUrl = newSearch ? `?${newSearch}` : '';
    
    if (location.search !== newUrl) {
      navigate(newUrl, { replace: true });
    }
    
    // Apply filters
    let results = tutorials;
    
    if (selectedCategory && selectedCategory !== 'all') {
      // Cast the selectedCategory to Category type only when we're sure it's a valid category
      const validCategory = getAllCategories().includes(selectedCategory as Category) 
        ? selectedCategory as Category 
        : null;
        
      if (validCategory) {
        results = getTutorialsByCategory(validCategory);
      }
    }
    
    if (selectedTag) {
      results = results.filter(tutorial => tutorial.tags.includes(selectedTag));
    }
    
    if (searchQuery) {
      results = searchTutorials(searchQuery).filter(tutorial => 
        results.some(r => r.id === tutorial.id)
      );
    }
    
    setFilteredTutorials(results);
  }, [tutorials, selectedCategory, selectedTag, searchQuery, location.search, navigate]);
  
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };
  
  const handleTagChange = (tag: string | null) => {
    setSelectedTag(tag);
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSelectedTag(null);
    setSearchQuery('');
  };
  
  return (
    <>
      <Helmet>
        <title>OpenCrochet | Crochet Patterns & Tutorials Directory</title>
        <meta name="description" content="Discover free crochet patterns, tutorials, and guides for all skill levels. A Pinterest-style directory for amigurumi, blankets, apparel, and more." />
        <meta name="keywords" content="crochet patterns, crochet tutorials, free crochet patterns, amigurumi, crochet blankets" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'OpenCrochet - Crochet Patterns Directory',
            description: 'Discover free crochet patterns, tutorials, and guides for all skill levels.',
            url: window.location.href,
          })}
        </script>
      </Helmet>
      
      <div className="flex min-h-screen flex-col">
        <Navbar onSearch={handleSearch} />
        
        <main className="flex-1">
          <div className="container py-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Discover Beautiful Crochet Patterns
                </h1>
                <p className="text-lg text-muted-foreground">
                  Browse our collection of free, high-quality crochet patterns and tutorials
                </p>
              </div>
              
              <FilterBar
                categories={getAllCategories()}
                tags={getAllTags()}
                selectedCategory={selectedCategory}
                selectedTag={selectedTag}
                onCategoryChange={handleCategoryChange}
                onTagChange={handleTagChange}
                onReset={handleResetFilters}
              />
              
              {filteredTutorials.length > 0 ? (
                <TutorialGrid tutorials={filteredTutorials} />
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <h3 className="text-lg font-medium">No patterns found</h3>
                  <p className="text-muted-foreground mt-1">
                    Try adjusting your filters or search query
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-4 inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    Reset all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
