"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FormFieldProps {
  label: string
  id: string
  type?: "text" | "email" | "password" | "number" | "date" | "textarea" | "select"
  placeholder?: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  options?: { value: string; label: string }[]
  className?: string
}

export function FormField({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  options = [],
  className = "",
}: FormFieldProps) {
  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <Textarea
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className={className}
          />
        )
      case "select":
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={className}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      default:
        return (
          <Input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className={className}
          />
        )
    }
  }

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {renderInput()}
    </div>
  )
}
