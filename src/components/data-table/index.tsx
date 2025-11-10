"use client";
import React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  PaginationState,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, FilterIcon, SearchIcon } from "lucide-react";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import TableHeader from "./TableHeader";
import { TableFooter } from "./Footer";
import SearchBar from "./Header/SearchBar";
import { Input } from "../ui/input";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends { status?: string }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [statusFilter, setStatusFilter] = React.useState<string>("All");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      rowSelection,
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 20,
        pageIndex: 0,
      },
    },
  });
 const filteredRows =
    statusFilter === "All"
      ? table.getFilteredRowModel().rows
      : table
          .getFilteredRowModel()
          .rows.filter((row) => row.original.status === statusFilter);

  return (
    <div className="flex flex-col pb-10">
      {/* <TableTabs /> */}
      <div className="flex items-center py-4">
      <div className="flex flex-row items-center h-9 rounded-lg shadow-sm">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex flex-row items-center h-full px-5 rounded-l-lg border gap-2 text-sm">
          <FilterIcon className="w-4 h-4" fill="currentColor" />
          {statusFilter}
          <ChevronDown className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
              {["All", "Open", "In Progress", "Done"].map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={statusFilter === status ? "font-medium" : ""}
                >
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex flex-row items-center rounded-r-lg border border-l-0 h-full relative">
        <SearchIcon className="w-4 h-4 ml-2 absolute text-gray-400" />
        <Input
          placeholder="Search work Title"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-full py-0 px-3 border-none text-sm w-72 rounded-r-lg pl-8"
        />
      </div>
    </div>
      </div>
      <div className="rounded-md border relative">
        <Table>
          <TableHeader table={table} />
          <TableBody>
            {filteredRows?.length ? (
            filteredRows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TableFooter table={table} />
    </div>
  );
}
