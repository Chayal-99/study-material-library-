import { Link } from 'wouter';
import { BookOpen, StickyNote, FileText, Flask } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { MaterialCategory, getCategoryIcon } from '@/lib/materialTypes';

interface CategoryCardProps {
  category: MaterialCategory;
  label: string;
  count: number;
  color: string;
}

export default function CategoryCard({ category, label, count, color }: CategoryCardProps) {
  const getIcon = () => {
    switch (getCategoryIcon(category)) {
      case 'book':
        return <BookOpen className={`h-10 w-10 ${color} mb-3`} />;
      case 'sticky-note':
        return <StickyNote className={`h-10 w-10 ${color} mb-3`} />;
      case 'file-alt':
        return <FileText className={`h-10 w-10 ${color} mb-3`} />;
      case 'flask':
        return <Flask className={`h-10 w-10 ${color} mb-3`} />;
      default:
        return <BookOpen className={`h-10 w-10 ${color} mb-3`} />;
    }
  };

  const borderColors: Record<MaterialCategory, string> = {
    'book': 'border-primary',
    'notes': 'border-blue-400',
    'past_paper': 'border-purple-500',
    'research': 'border-pink-500'
  };

  const textColors: Record<MaterialCategory, string> = {
    'book': 'text-primary',
    'notes': 'text-blue-400',
    'past_paper': 'text-purple-500',
    'research': 'text-pink-500'
  };

  return (
    <Link href={`/category/${category}`}>
      <a>
        <Card className={`shadow-sm hover:shadow-md transition-shadow p-6 text-center border-t-4 ${borderColors[category]}`}>
          <CardContent className="p-0">
            <div className="flex flex-col items-center">
              {getIcon()}
              <h3 className="font-semibold text-gray-800">{label}</h3>
              <p className="text-gray-600 text-sm mt-1">
                {count.toLocaleString()} resources
              </p>
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
