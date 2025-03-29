import { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  MaterialCategory, 
  Subject, 
  YearLevel, 
  MATERIAL_CATEGORIES, 
  SUBJECTS, 
  YEAR_LEVELS,
  getCategoryLabel,
  getSubjectLabel,
  getYearLevelLabel,
  FilterState,
  defaultFilterState
} from '@/lib/materialTypes';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const [tempFilters, setTempFilters] = useState<FilterState>(filters);

  const handleCategoryChange = (category: MaterialCategory, checked: boolean) => {
    setTempFilters(prev => {
      const newCategories = checked
        ? [...prev.categories, category]
        : prev.categories.filter(c => c !== category);
      
      return {
        ...prev,
        categories: newCategories
      };
    });
  };

  const handleSubjectChange = (value: string) => {
    setTempFilters(prev => ({
      ...prev,
      subject: value as Subject | 'all'
    }));
  };

  const handleYearLevelChange = (yearLevel: YearLevel, checked: boolean) => {
    setTempFilters(prev => {
      const newYearLevels = checked
        ? [...prev.yearLevels, yearLevel]
        : prev.yearLevels.filter(yl => yl !== yearLevel);
      
      return {
        ...prev,
        yearLevels: newYearLevels
      };
    });
  };

  const applyFilters = () => {
    onFilterChange(tempFilters);
  };

  const resetFilters = () => {
    const reset = { ...defaultFilterState };
    setTempFilters(reset);
    onFilterChange(reset);
  };

  return (
    <Card className="sticky top-24">
      <CardContent className="p-5">
        <CardTitle className="font-semibold text-gray-800 text-lg mb-4">Filters</CardTitle>
        
        {/* Category Filter */}
        <div className="mb-5">
          <h4 className="font-medium text-gray-700 mb-2">Category</h4>
          <div className="space-y-2">
            {MATERIAL_CATEGORIES.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox 
                  id={`category-${category}`}
                  checked={tempFilters.categories.includes(category)}
                  onCheckedChange={(checked) => 
                    handleCategoryChange(category, checked as boolean)
                  }
                />
                <Label htmlFor={`category-${category}`}>{getCategoryLabel(category)}</Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Subject Filter */}
        <div className="mb-5">
          <h4 className="font-medium text-gray-700 mb-2">Subject</h4>
          <Select 
            value={tempFilters.subject} 
            onValueChange={handleSubjectChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {SUBJECTS.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {getSubjectLabel(subject)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Year Level Filter */}
        <div className="mb-5">
          <h4 className="font-medium text-gray-700 mb-2">Year Level</h4>
          <div className="space-y-2">
            {YEAR_LEVELS.map((yearLevel) => (
              <div key={yearLevel} className="flex items-center space-x-2">
                <Checkbox 
                  id={`year-${yearLevel}`}
                  checked={tempFilters.yearLevels.includes(yearLevel)}
                  onCheckedChange={(checked) => 
                    handleYearLevelChange(yearLevel, checked as boolean)
                  }
                />
                <Label htmlFor={`year-${yearLevel}`}>{getYearLevelLabel(yearLevel)}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Button 
            className="w-full"
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={resetFilters}
          >
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
