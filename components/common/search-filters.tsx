"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface FilterOption {
  value: string
  label: string
}

interface SearchFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  filters?: {
    value: string
    onChange: (value: string) => void
    placeholder: string
    options: FilterOption[]
  }[]
}

export function SearchFilters({
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Buscar...",
  filters = [],
}: SearchFiltersProps) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      {filters.map((filter, index) => (
        <Select key={index} value={filter.value} onValueChange={filter.onChange}>
          <SelectTrigger className="w-[180px] bg-slate-100 border-slate-300 hover:bg-slate-200 focus:border-slate-400">
            <SelectValue placeholder={filter.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {filter.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  )
}
