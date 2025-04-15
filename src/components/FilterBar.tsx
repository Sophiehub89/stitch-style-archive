
import React from 'react';
import { Button } from './ui/button';
import { Check, ChevronsUpDown, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Category, Tag } from '@/types';

interface FilterBarProps {
  categories: Category[];
  tags: Tag[];
  selectedCategory: string | null;
  selectedTag: string | null;
  onCategoryChange: (category: string | null) => void;
  onTagChange: (tag: string | null) => void;
  onReset: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  tags,
  selectedCategory,
  selectedTag,
  onCategoryChange,
  onTagChange,
  onReset,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 py-4">
      <div className="flex items-center mr-4">
        <Filter className="mr-2 h-4 w-4" />
        <span className="text-sm font-medium">Filters:</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-between">
            {selectedCategory || 'All Categories'}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          <DropdownMenuCheckboxItem
            checked={selectedCategory === null}
            onSelect={() => onCategoryChange(null)}
          >
            All Categories
          </DropdownMenuCheckboxItem>
          {categories.map((category) => (
            <DropdownMenuCheckboxItem
              key={category}
              checked={selectedCategory === category}
              onSelect={() => onCategoryChange(category)}
            >
              {category}
              {selectedCategory === category && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-between">
            {selectedTag || 'All Tags'}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          <DropdownMenuCheckboxItem
            checked={selectedTag === null}
            onSelect={() => onTagChange(null)}
          >
            All Tags
          </DropdownMenuCheckboxItem>
          {tags.map((tag) => (
            <DropdownMenuCheckboxItem
              key={tag}
              checked={selectedTag === tag}
              onSelect={() => onTagChange(tag)}
            >
              {tag}
              {selectedTag === tag && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {(selectedCategory || selectedTag) && (
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset filters
        </Button>
      )}
    </div>
  );
};

export default FilterBar;
