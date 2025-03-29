import { useState, FormEvent } from 'react';
import { useLocation } from 'wouter';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  className?: string;
}

export default function SearchBar({ className = "" }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [, setLocation] = useLocation();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim().length > 0) {
      setLocation(`/search/${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative max-w-2xl mx-auto ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
        <Input
          type="text"
          placeholder="Search for books, notes, past papers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-24 py-3 rounded-lg shadow-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <Button 
          type="submit"
          className="absolute right-2 top-2"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
