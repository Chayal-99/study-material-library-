import { useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { ChevronLeft, Download, User, Building, Calendar, Eye } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useMaterial, useDownloadMaterial } from '@/hooks/useMaterials';
import { getCategoryLabel, getCategoryColor, getSubjectLabel, getYearLevelLabel } from '@/lib/materialTypes';

export default function Material() {
  const { id } = useParams<{ id: string }>();
  const materialId = parseInt(id);
  const { toast } = useToast();
  const { data: material, isLoading, error } = useMaterial(materialId);
  const downloadMutation = useDownloadMaterial();
  
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load material details. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);
  
  const handleDownload = () => {
    if (material) {
      downloadMutation.mutate(material.id);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 w-40 bg-gray-200 rounded mb-4"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-6"></div>
              </div>
              <div className="md:w-1/3">
                <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded mt-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!material) {
    return (
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Material Not Found</h1>
          <p className="text-gray-600 mb-6">The material you're looking for doesn't exist or has been removed.</p>
          <Link href="/">
            <Button>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/">
            <a className="inline-flex items-center text-primary hover:text-blue-700 font-medium mb-4">
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to materials
            </a>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">{material.title}</h1>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="relative">
                <img 
                  src={material.coverImage} 
                  alt={`${material.title} cover`} 
                  className="w-full h-64 object-cover"
                />
                <div className={`absolute top-4 right-4 ${getCategoryColor(material.category)} text-white text-sm font-bold px-3 py-1 rounded-full`}>
                  {getCategoryLabel(material.category)}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Description</h2>
                <p className="text-gray-700 mb-6">{material.description}</p>
                
                <Separator className="my-6" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {material.author && (
                    <div className="flex items-center text-gray-700">
                      <User className="h-5 w-5 mr-2 text-primary" />
                      <span className="font-medium mr-2">Author:</span>
                      {material.author}
                    </div>
                  )}
                  
                  {material.institution && (
                    <div className="flex items-center text-gray-700">
                      <Building className="h-5 w-5 mr-2 text-primary" />
                      <span className="font-medium mr-2">Institution:</span>
                      {material.institution}
                    </div>
                  )}
                  
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    <span className="font-medium mr-2">Added:</span>
                    {formatDate(material.createdAt.toString())}
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <Download className="h-5 w-5 mr-2 text-primary" />
                    <span className="font-medium mr-2">Downloads:</span>
                    {material.downloads.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="md:w-1/3">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Material Details</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium">Type:</span>
                    <span>{getCategoryLabel(material.category)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium">Subject:</span>
                    <span>{getSubjectLabel(material.subject)}</span>
                  </div>
                  
                  {material.yearLevel && (
                    <div className="flex justify-between text-gray-700">
                      <span className="font-medium">Year Level:</span>
                      <span>{getYearLevelLabel(material.yearLevel)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium">Format:</span>
                    <span>PDF Document</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleDownload}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  size="lg"
                >
                  Download Now <Download className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
