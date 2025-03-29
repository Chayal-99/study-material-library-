import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { MaterialType, CategoryCount, FilterState } from '@/lib/materialTypes';

export function useAllMaterials() {
  return useQuery<MaterialType[]>({
    queryKey: ['/api/materials'],
  });
}

export function useFeaturedMaterials(limit = 4) {
  return useQuery<MaterialType[]>({
    queryKey: ['/api/materials/featured', limit],
  });
}

export function useMaterial(id: number) {
  return useQuery<MaterialType>({
    queryKey: [`/api/materials/${id}`],
    enabled: !!id,
  });
}

export function useMaterialsByCategory(category: string) {
  return useQuery<MaterialType[]>({
    queryKey: [`/api/materials/category/${category}`],
    enabled: !!category,
  });
}

export function useMaterialsBySubject(subject: string) {
  return useQuery<MaterialType[]>({
    queryKey: [`/api/materials/subject/${subject}`],
    enabled: !!subject,
  });
}

export function useMaterialsByYearLevel(yearLevel: string) {
  return useQuery<MaterialType[]>({
    queryKey: [`/api/materials/year-level/${yearLevel}`],
    enabled: !!yearLevel,
  });
}

export function useSearchMaterials(query: string) {
  return useQuery<MaterialType[]>({
    queryKey: [`/api/materials/search/${query}`],
    enabled: query.length > 2, // Only search if query is at least 3 characters
  });
}

export function useCategoryCounts() {
  return useQuery<CategoryCount[]>({
    queryKey: ['/api/categories/counts'],
  });
}

export function useFilteredMaterials(filters: FilterState) {
  const { data: allMaterials, isLoading } = useAllMaterials();
  
  // Filter the materials client-side based on the filters
  const filteredMaterials = allMaterials?.filter(material => {
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
  
  return {
    data: filteredMaterials || [],
    isLoading,
  };
}

export function useDownloadMaterial() {
  const downloadMutation = useMutation({
    mutationFn: async (id: number) => {
      window.open(`/api/download/${id}`, '_blank');
      return id;
    },
    onSuccess: (id) => {
      // Invalidate the specific material to update its download count
      queryClient.invalidateQueries({ queryKey: [`/api/materials/${id}`] });
    },
  });
  
  return downloadMutation;
}

export function useIncrementDownloads(id: number) {
  const incrementMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/materials/${id}/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to record download');
      }
      
      return await response.json();
    },
    onSuccess: () => {
      // Invalidate the specific material to update its download count
      queryClient.invalidateQueries({ queryKey: [`/api/materials/${id}`] });
    },
  });
  
  return incrementMutation;
}
