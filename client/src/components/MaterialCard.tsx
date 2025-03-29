import { Link } from 'wouter';
import { User, Building, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MaterialType, getCategoryColor, getCategoryLabel } from '@/lib/materialTypes';
import { useDownloadMaterial } from '@/hooks/useMaterials';

interface MaterialCardProps {
  material: MaterialType;
}

export default function MaterialCard({ material }: MaterialCardProps) {
  const downloadMutation = useDownloadMaterial();
  
  const handleDownload = () => {
    downloadMutation.mutate(material.id);
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-40 bg-gray-200">
        <img 
          src={material.coverImage} 
          alt={`${material.title} cover`} 
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-2 right-2 ${getCategoryColor(material.category)} text-white text-xs font-bold px-2 py-1 rounded`}>
          {getCategoryLabel(material.category)}
        </div>
      </div>
      <CardContent className="p-4">
        <div onClick={() => window.location.href = `/material/${material.id}`} className="cursor-pointer">
          <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1 hover:text-primary transition-colors">
            {material.title}
          </h3>
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {material.description}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span className="flex items-center">
            {material.author ? (
              <>
                <User className="h-3 w-3 mr-1" /> {material.author}
              </>
            ) : material.institution ? (
              <>
                <Building className="h-3 w-3 mr-1" /> {material.institution}
              </>
            ) : null}
          </span>
          <span className="flex items-center">
            <Download className="h-3 w-3 mr-1" /> {material.downloads.toLocaleString()}
          </span>
        </div>
        <Button 
          onClick={handleDownload}
          className="w-full bg-emerald-600 hover:bg-emerald-700"
        >
          Download <Download className="h-4 w-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}
