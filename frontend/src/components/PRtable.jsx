"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Dummy PR data
const data = [
  { id: 101, title: "Fix login issue", contributor: "alice", status: "open", riskScore: 3 },
  { id: 99, title: "Add dark mode", contributor: "bob", status: "merged", riskScore: 7 },
  { id: 87, title: "Refactor API layer", contributor: "charlie", status: "closed", riskScore: 5 },
]

export const columns = [
  {
    accessorKey: "id",
    header: "PR #",
    cell: ({ row }) => <span className="font-medium">#{row.getValue("id")}</span>,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-white"
      >
        Title <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span>{row.getValue("title")}</span>,
  },
  {
    accessorKey: "contributor",
    header: "Contributor",
    cell: ({ row }) => <span>@{row.getValue("contributor")}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")
      const color =
        status === "merged"
          ? "text-green-400"
          : status === "open"
          ? "text-blue-400"
          : "text-red-400"
      return <span className={`capitalize font-medium ${color}`}>{status}</span>
    },
  },
  {
    accessorKey: "riskScore",
    header: "Risk Score",
    cell: ({ row }) => {
      const score = row.getValue("riskScore")
      const color =
        score >= 7 ? "text-red-400" : score >= 4 ? "text-yellow-400" : "text-green-400"
      return <span className={`font-bold ${color}`}>{score}/10</span>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const pr = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-white">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-800 text-white">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(`#${pr.id} - ${pr.title}`)}
            >
              Copy PR details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <a
                href={`https://github.com/pr-url/${pr.id}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400"
              >
                View on GitHub
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function PRTable() {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full bg-black text-gray-200 min-h-screen p-6">
      {/* Controls Row */}
      <div className="flex items-center justify-between py-4">
        {/* Left spacer */}
        <div className="w-1/3"></div>

        {/* Search Center */}
        <div className="w-1/3 flex justify-center">
          <Input
            placeholder="Search PR titles..."
            value={table.getColumn("title")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-gray-900 border-gray-700 text-white"
          />
        </div>

      
        {/* Filter Right */}

          <div className="w-1/3 flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-gray-900 border-gray-700 text-white">
                  Filter by Status <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gray-800 text-white">
                {["all", "open", "merged", "closed"].map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={
                      status === "all"
                        ? table.getColumn("status")?.getFilterValue() === undefined
                        : table.getColumn("status")?.getFilterValue() === status
                    }
                    onCheckedChange={(value) => {
                      if (status === "all") {
                        // clear filter when "all" is selected
                        table.getColumn("status")?.setFilterValue(undefined);
                      } else {
                        table.getColumn("status")?.setFilterValue(value ? status : undefined);
                      }
                    }}
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md border border-gray-700">
        <Table>
          <TableHeader className="bg-gray-900">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-gray-300">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-gray-800">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-gray-200">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No PRs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="bg-gray-900 border-gray-700 text-white"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="bg-gray-900 border-gray-700 text-white"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
