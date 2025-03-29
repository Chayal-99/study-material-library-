import { useEffect } from 'react';
import { Link } from 'wouter';
import { ChevronRight, BookOpen, FileText, ClipboardList, Download, GraduationCap, Beaker, Calculator } from 'lucide-react';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import MaterialCard from '@/components/MaterialCard';
import CategoryCard from '@/components/CategoryCard';
import { useToast } from '@/hooks/use-toast';
import { useFeaturedMaterials, useCategoryCounts } from '@/hooks/useMaterials';
import { 
  getCategoryLabel, 
  getCategoryIcon,
  getYearLevelLabel,
  getSubjectLabel,
  MaterialCategory,
  Subject,
  YearLevel
} from '@/lib/materialTypes';

export default function Home() {
  const { toast } = useToast();
  const { data: featuredMaterials, isLoading: featuredLoading, error: featuredError } = useFeaturedMaterials();
  const { data: categoryCounts, isLoading: categoriesLoading, error: categoriesError } = useCategoryCounts();

  useEffect(() => {
    if (featuredError) {
      toast({
        title: "Error",
        description: "Failed to load featured materials. Please try again later.",
        variant: "destructive",
      });
    }

    if (categoriesError) {
      toast({
        title: "Error",
        description: "Failed to load categories. Please try again later.",
        variant: "destructive",
      });
    }
  }, [featuredError, categoriesError, toast]);

  // Map category to text color class
  const getCategoryTextColor = (category: MaterialCategory): string => {
    switch (category) {
      case 'book': return 'text-blue-600';
      case 'notes': return 'text-red-600';
      case 'past_paper': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  // Define our college subjects
  const subjects: Subject[] = ['physics', 'chemistry', 'mathematics'];
  
  // Define our college year levels
  const yearLevels: YearLevel[] = ['bsc_first_year', 'bsc_second_year', 'bsc_third_year'];

  return (
    <Layout>
      {/* Hero Section with Search */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-12 md:py-20 border-b-4 border-red-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">GHS Govt. PG College</h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Sujangarh</h2>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl mb-8 border border-white/20">
              <h3 className="text-2xl font-bold text-red-300 mb-2">Free Study Materials</h3>
              <p className="text-lg md:text-xl mb-5">
                Notes, Books, Past Papers for all BSc subjects
              </p>
              <div className="flex justify-center">
                <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full flex items-center gap-2 font-bold shadow-lg hover:shadow-xl transition-all">
                  <Download className="h-5 w-5" /> Download Free
                </button>
              </div>
            </div>
            
            {/* Search Bar */}
            <SearchBar className="max-w-3xl mx-auto" />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Materials Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-blue-800 border-l-4 border-red-600 pl-3">Featured Materials</h2>
            <div 
              onClick={() => window.location.href = '/materials'}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center cursor-pointer"
            >
              View all <ChevronRight className="ml-1 h-4 w-4" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredLoading ? (
              // Skeleton loading
              Array(4).fill(0).map((_, i) => (
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
              ))
            ) : featuredMaterials && featuredMaterials.length > 0 ? (
              featuredMaterials.map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                No featured materials available at the moment.
              </div>
            )}
          </div>
        </section>
        
        {/* Quick Access Section */}
        <section className="mb-12 bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 border-l-4 border-red-600 pl-3">Quick Access</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              onClick={() => window.location.href = '/category/book'}
              className="bg-gradient-to-br from-white to-blue-50 rounded-lg p-4 flex items-center gap-3 shadow hover:shadow-md transition-all hover:translate-y-[-2px] cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-900">Books</h3>
                <p className="text-sm text-gray-600">Reference & Textbooks</p>
              </div>
            </div>
            
            <div 
              onClick={() => window.location.href = '/category/notes'}
              className="bg-gradient-to-br from-white to-red-50 rounded-lg p-4 flex items-center gap-3 shadow hover:shadow-md transition-all hover:translate-y-[-2px] cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium text-red-900">Notes</h3>
                <p className="text-sm text-gray-600">Class & Lecture Notes</p>
              </div>
            </div>
            
            <div 
              onClick={() => window.location.href = '/category/past_paper'}
              className="bg-gradient-to-br from-white to-blue-50 rounded-lg p-4 flex items-center gap-3 shadow hover:shadow-md transition-all hover:translate-y-[-2px] cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <ClipboardList className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-900">Past Papers</h3>
                <p className="text-sm text-gray-600">Previous Year Papers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Browse by Subject Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 border-l-4 border-red-600 pl-3">Browse by Subject</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjects.map((subject) => {
              const iconMap = {
                'physics': <GraduationCap className="h-8 w-8 text-blue-600" />,
                'chemistry': <Beaker className="h-8 w-8 text-red-600" />,
                'mathematics': <Calculator className="h-8 w-8 text-blue-600" />
              };
              
              const bgColorMap = {
                'physics': 'bg-gradient-to-br from-white to-blue-50 border-blue-200',
                'chemistry': 'bg-gradient-to-br from-white to-red-50 border-red-200',
                'mathematics': 'bg-gradient-to-br from-white to-blue-50 border-blue-200'
              };
              
              return (
                <div 
                  key={subject} 
                  onClick={() => window.location.href = `/subject/${subject}`}
                  className={`rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all hover:translate-y-[-2px] border cursor-pointer ${bgColorMap[subject]}`}
                >
                  <div className={`w-16 h-16 rounded-full ${subject === 'chemistry' ? 'bg-red-100' : 'bg-blue-100'} flex items-center justify-center mx-auto mb-4`}>
                    {iconMap[subject]}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{getSubjectLabel(subject)}</h3>
                  <p className="text-gray-600 mb-4">
                    {subject === 'physics' && 'Mechanics, Thermodynamics, Quantum Physics and more'}
                    {subject === 'chemistry' && 'Inorganic, Organic, Physical Chemistry and more'}
                    {subject === 'mathematics' && 'Calculus, Algebra, Analysis and more'}
                  </p>
                  <span className={`font-medium ${subject === 'chemistry' ? 'text-red-600' : 'text-blue-600'}`}>
                    Browse Materials
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Browse by Year Level Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 border-l-4 border-red-600 pl-3">Browse by Year</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {yearLevels.map((yearLevel, index) => {
              const isEven = index % 2 === 0;
              const colorClass = isEven ? 'bg-blue-600' : 'bg-red-600';
              
              return (
                <div 
                  key={yearLevel}
                  onClick={() => window.location.href = `/year-level/${yearLevel}`}
                  className="bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all hover:translate-y-[-2px] border border-blue-200 cursor-pointer"
                >
                  <div className={`w-16 h-16 rounded-full bg-white border-2 ${isEven ? 'border-blue-400' : 'border-red-400'} flex items-center justify-center mx-auto mb-4`}>
                    <span className={`text-2xl font-bold ${isEven ? 'text-blue-600' : 'text-red-600'}`}>
                      {yearLevel === 'bsc_first_year' && '1'}
                      {yearLevel === 'bsc_second_year' && '2'}
                      {yearLevel === 'bsc_third_year' && '3'}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{getYearLevelLabel(yearLevel)}</h3>
                  <p className="text-gray-600 mb-4">
                    {yearLevel === 'bsc_first_year' && 'Foundation courses for first year students'}
                    {yearLevel === 'bsc_second_year' && 'Intermediate level courses for second year'}
                    {yearLevel === 'bsc_third_year' && 'Advanced courses and exam preparation'}
                  </p>
                  <span className={`font-medium ${isEven ? 'text-blue-600' : 'text-red-600'}`}>
                    View Materials
                  </span>
                </div>
              );
            })}
          </div>
        </section>
        
        {/* Featured Past Papers Banner */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg text-white p-6 md:p-8 shadow-lg">
            <div className="md:flex items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">2023 Examination Papers</h2>
                <p className="text-white/90">
                  Download previous year examination papers for all BSc subjects
                </p>
              </div>
              <div 
                onClick={() => window.location.href = '/category/past_paper'}
                className="inline-block bg-white text-red-700 px-6 py-3 rounded-md font-medium hover:bg-red-50 transition-colors shadow cursor-pointer"
              >
                View All Papers
              </div>
            </div>
          </div>
        </section>
        
        {/* College Info Banner */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg text-white p-6 md:p-8 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full opacity-20 transform translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500 rounded-full opacity-20 transform -translate-x-20 translate-y-20"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-4">About GHS Govt. PG College</h2>
              <p className="text-white/90 mb-6">
                GHS Govt. PG College is one of the premier educational institutions in Sujangarh, providing quality education to students in various fields including Science, Arts, and Commerce.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Established</h3>
                  <p className="text-white/80">1958</p>
                </div>
                
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Affiliated To</h3>
                  <p className="text-white/80">University of Rajasthan</p>
                </div>
                
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Campus</h3>
                  <p className="text-white/80">40 Acres</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
