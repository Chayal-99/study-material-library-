import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import Layout from '@/components/Layout';
import MaterialCard from '@/components/MaterialCard';
import FilterSidebar from '@/components/FilterSidebar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  useMaterialsByCategory, 
  useMaterialsBySubject, 
  useMaterialsByYearLevel, 
  useFilteredMaterials 
} from '@/hooks/useMaterials';
import { 
  MaterialCategory, 
  Subject,
  YearLevel,
  getCategoryLabel,
  getSubjectLabel,
  getYearLevelLabel,
  FilterState,
  defaultFilterState
} from '@/lib/materialTypes';

export default function Category() {
  const [location] = useLocation();
  const params = useParams();
  const { toast } = useToast();
  
  // Parse params based on route
  const category = params.category as MaterialCategory;
  const subject = params.subject as Subject;
  const yearLevel = params.yearLevel as YearLevel;
  
  // Determine which API to use based on route
  const isCategoryRoute = location.startsWith('/category/');
  const isSubjectRoute = location.startsWith('/subject/');
  const isYearLevelRoute = location.startsWith('/year-level/');
  
  // Use appropriate query based on route type
  const { data: categoryMaterials, isLoading: categoryLoading, error: categoryError } = 
    useMaterialsByCategory(category);
  
  const { data: subjectMaterials, isLoading: subjectLoading, error: subjectError } = 
    useMaterialsBySubject(subject);
  
  const { data: yearLevelMaterials, isLoading: yearLevelLoading, error: yearLevelError } = 
    useMaterialsByYearLevel(yearLevel);
  
  // Determine which materials to display
  const materials = 
    isCategoryRoute ? categoryMaterials : 
    isSubjectRoute ? subjectMaterials : 
    isYearLevelRoute ? yearLevelMaterials : [];
  
  const isLoading = 
    isCategoryRoute ? categoryLoading : 
    isSubjectRoute ? subjectLoading : 
    isYearLevelRoute ? yearLevelLoading : false;
  
  const error = 
    isCategoryRoute ? categoryError : 
    isSubjectRoute ? subjectError : 
    isYearLevelRoute ? yearLevelError : null;
  
  // Get the page title based on route type
  const getPageTitle = () => {
    if (isCategoryRoute && category) {
      return getCategoryLabel(category);
    } else if (isSubjectRoute && subject) {
      return getSubjectLabel(subject);
    } else if (isYearLevelRoute && yearLevel) {
      return getYearLevelLabel(yearLevel);
    }
    return 'Materials';
  };
  
  const [sortOption, setSortOption] = useState<string>("popular");
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilterState,
    categories: isCategoryRoute && category ? [category] : defaultFilterState.categories,
    subject: isSubjectRoute && subject ? subject : defaultFilterState.subject,
    yearLevels: isYearLevelRoute && yearLevel ? [yearLevel] : defaultFilterState.yearLevels
  });
  
  // Filtered materials support
  const { data: filteredMaterials } = useFilteredMaterials(filters);
  
  const displayMaterials = materials || [];
  
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load materials. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);
  
  // Update filters when route/params change
  useEffect(() => {
    if (isCategoryRoute && category) {
      setFilters(prev => ({
        ...prev,
        categories: [category]
      }));
    } else if (isSubjectRoute && subject) {
      setFilters(prev => ({
        ...prev,
        subject: subject
      }));
    } else if (isYearLevelRoute && yearLevel) {
      setFilters(prev => ({
        ...prev,
        yearLevels: [yearLevel]
      }));
    }
  }, [category, subject, yearLevel, isCategoryRoute, isSubjectRoute, isYearLevelRoute]);
  
  // Sort materials based on selected option
  const sortedMaterials = [...displayMaterials].sort((a, b) => {
    switch (sortOption) {
      case "popular":
        return b.downloads - a.downloads;
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "az":
        return a.title.localeCompare(b.title);
      case "za":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });
  
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          {getPageTitle()}
        </h1>
        
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <FilterSidebar 
              filters={filters}
              onFilterChange={setFilters}
            />
          </div>
          
          {/* Materials List */}
          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-semibold text-gray-800 text-xl mb-2 sm:mb-0">
                  {getPageTitle()} Materials
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select 
                    className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-1 px-2 text-sm bg-white"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
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
            ) : sortedMaterials.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedMaterials.map((material) => (
                  <MaterialCard key={material.id} material={material} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-700 mb-2">No materials found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search for something else.</p>
                <Button 
                  onClick={() => setFilters(defaultFilterState)}
                  variant="outline"
                >
                  Reset Filters
                </Button>
              </div>
            )}
            
            {/* Pagination - can be added later when we have more data */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
