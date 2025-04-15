
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
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
import { Tutorial, Category, Tag } from '@/types';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    queryParams.get('category') as Category | null
  );
  const [selectedTag, setSelectedTag] = useState<Tag | null>(
    queryParams.get('tag') as Tag | null
  );
  const [searchQuery, setSearchQuery] = useState<string>(
    queryParams.get('search') || ''
  );
  const [filteredTutorials, setFilteredTutorials] = useState<Tutorial[]>([]);
  
  // Fetch all tutorials
  const { data: tutorials = [], isLoading: isTutorialsLoading } = useQuery({
    queryKey: ['tutorials'],
    queryFn: getAllTutorials
  });
  
  // Fetch categories
  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });
  
  // Fetch tags
  const { data: tags = [], isLoading: isTagsLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: getAllTags
  });
  
  // Fetch tutorials by category
  const { data: categoryTutorials = [] } = useQuery({
    queryKey: ['tutorials', 'category', selectedCategory],
    queryFn: () => selectedCategory ? getTutorialsByCategory(selectedCategory) : Promise.resolve([]),
    enabled: !!selectedCategory
  });
  
  // Fetch tutorials by tag
  const { data: tagTutorials = [] } = useQuery({
    queryKey: ['tutorials', 'tag', selectedTag],
    queryFn: () => selectedTag ? getTutorialsByTag(selectedTag as Tag) : Promise.resolve([]),
    enabled: !!selectedTag
  });
  
  // Search tutorials
  const { data: searchResults = [] } = useQuery({
    queryKey: ['tutorials', 'search', searchQuery],
    queryFn: () => searchQuery ? searchTutorials(searchQuery) : Promise.resolve([]),
    enabled: !!searchQuery
  });
  
  useEffect(() => {
    // Update URL with current filters
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedTag) params.set('tag', selectedTag);
    if (searchQuery) params.set('search', searchQuery);
    
    const newSearch = params.toString();
    const newUrl = newSearch ? `?${newSearch}` : '';
    
    if (location.search !== newUrl) {
      navigate(newUrl, { replace: true });
    }
    
    // Apply filters
    let results = tutorials;
    
    if (selectedCategory) {
      results = categoryTutorials;
    }
    
    if (selectedTag) {
      // If we already filtered by category, we need to find the intersection
      if (selectedCategory) {
        results = results.filter(tutorial => 
          tagTutorials.some(t => t.id === tutorial.id)
        );
      } else {
        results = tagTutorials;
      }
    }
    
    if (searchQuery) {
      // If we already filtered by category or tag, we need to find the intersection
      if (selectedCategory || selectedTag) {
        results = results.filter(tutorial => 
          searchResults.some(t => t.id === tutorial.id)
        );
      } else {
        results = searchResults;
      }
    }
    
    setFilteredTutorials(results);
  }, [
    tutorials,
    selectedCategory,
    selectedTag,
    searchQuery,
    location.search,
    navigate,
    categoryTutorials,
    tagTutorials,
    searchResults
  ]);
  
  const handleCategoryChange = (category: Category | null) => {
    setSelectedCategory(category);
  };
  
  const handleTagChange = (tag: Tag | null) => {
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
  
  const isLoading = isTutorialsLoading || isCategoriesLoading || isTagsLoading;
  
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
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                    Discover Beautiful Crochet Patterns
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Browse our collection of free, high-quality crochet patterns and tutorials
                  </p>
                </div>
                
                <Link to="/import">
                  <Button className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Import Patterns
                  </Button>
                </Link>
              </div>
              
              <FilterBar
                categories={categories}
                tags={tags}
                selectedCategory={selectedCategory}
                selectedTag={selectedTag}
                onCategoryChange={handleCategoryChange}
                onTagChange={handleTagChange}
                onReset={handleResetFilters}
              />
              
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="rounded-lg border animate-pulse bg-muted h-80"></div>
                  ))}
                </div>
              ) : filteredTutorials.length > 0 ? (
                <TutorialGrid tutorials={filteredTutorials} />
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <h3 className="text-lg font-medium">No patterns found</h3>
                  <p className="text-muted-foreground mt-1">
                    Try adjusting your filters or search query
                  </p>
                  <Button
                    onClick={handleResetFilters}
                    className="mt-4"
                    variant="outline"
                  >
                    Reset all filters
                  </Button>
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
