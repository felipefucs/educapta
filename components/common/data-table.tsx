"use client"

import type React from "react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface TableColumn {
  key: string
  label: string
  render?: (value: any, row: any) => React.ReactNode
}

interface TableAction {
  icon: LucideIcon
  onClick: (row: any) => void
  variant?: "default" | "outline" | "destructive" | "secondary" | "ghost" | "link"
  tooltip?: string
}

interface DataTableProps {
  columns: TableColumn[]
  data: any[]
  actions?: TableAction[]
}

export function DataTable({ columns, data, actions }: DataTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key}>{column.label}</TableHead>
          ))}
          {actions && actions.length > 0 && <TableHead>Ações</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell key={column.key}>
                {column.render ? column.render(row[column.key], row) : row[column.key]}
              </TableCell>
            ))}
            {actions && actions.length > 0 && (
              <TableCell>
                <div className="flex gap-2">
                  {actions.map((action, actionIndex) => {
                    const ActionIcon = action.icon
                    return (
                      <Button
                        key={actionIndex}
                        size="sm"
                        variant={action.variant || "outline"}
                        onClick={() => action.onClick(row)}
                        title={action.tooltip}
                      >
                        <ActionIcon className="h-3 w-3" />
                      </Button>
                    )
                  })}
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
