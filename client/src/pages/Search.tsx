import { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import MaterialCard from '@/components/MaterialCard';
import FilterSidebar from '@/components/FilterSidebar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useSearchMaterials } from '@/hooks/useMaterials';
import { FilterState, defaultFilterState } from '@/lib/materialTypes';

export default function Search() {
  const { query } = useParams<{ query: string }>();
  const decodedQuery = decodeURIComponent(query);
  const { toast } = useToast();
  const { data: searchResults, isLoading, error } = useSearchMaterials(decodedQuery);
  
  const [sortOption, setSortOption] = useState<string>("relevance");
  const [filters, setFilters] = useState<FilterState>(defaultFilterState);
  
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to search materials. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);
  
  // Apply filters to search results
  const filteredResults = searchResults?.filter(material => {
    // Filter by categories
    if (filters.categories.length > 0 && !filters.categories.includes(material.category)) {
      return false;
    }
    
    // Filter by subject
    if (filters.subject !== 'all' && material.subject !== filters.subject) {
      return false;
    }
    
    // Filter by year levels
    if (filters.yearLevels.length > 0 && material.yearLevel && !filters.yearLevels.includes(material.yearLevel)) {
      return false;
    }
    
    return true;
  });
  
  // Sort filtered results
  const sortedResults = [...(filteredResults || [])].sort((a, b) => {
    switch (sortOption) {
      case "popular":
        return b.downloads - a.downloads;
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "az":
        return a.title.localeCompare(b.title);
      case "za":
        return b.title.localeCompare(a.title);
      case "relevance":
      default:
        // Simple relevance: If title contains the query exactly, prioritize
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();
        const query = decodedQuery.toLowerCase();
        if (aTitle.includes(query) && !bTitle.includes(query)) return -1;
        if (!aTitle.includes(query) && bTitle.includes(query)) return 1;
        return b.downloads - a.downloads; // Fall back to popularity
    }
  });
  
  return (
    <Layout>
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Search Results for "{decodedQuery}"
          </h1>
          <SearchBar className="max-w-3xl" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <FilterSidebar 
              filters={filters}
              onFilterChange={setFilters}
            />
          </div>
          
          {/* Search Results */}
          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-semibold text-gray-800 text-xl mb-2 sm:mb-0">
                  {isLoading 
                    ? "Searching..." 
                    : `${sortedResults?.length || 0} results found`}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select 
                    className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-1 px-2 text-sm bg-white"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest</option>
                    <option value="az">Title A-Z</option>
                    <option value="za">Title Z-A</option>
                  </select>
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Skeleton loading */}
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                    <div className="h-40 bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-3"></div>
                      <div className="h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4"></div>
                      <div className="flex justify-between mb-3">
                        <div className="h-3 w-20 bg-gray-200 rounded"></div>
                        <div className="h-3 w-12 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-9 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : sortedResults && sortedResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedResults.map((material) => (
                  <MaterialCard key={material.id} material={material} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-700 mb-2">No results found</h3>
                <p className="text-gray-500 mb-4">
                  We couldn't find any materials matching "{decodedQuery}".
                  Try different keywords or browse by category.
                </p>
                <Button 
                  onClick={() => setFilters(defaultFilterState)}
                  variant="outline"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
