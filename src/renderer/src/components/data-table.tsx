import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  Row,
} from "@tanstack/react-table"

import * as React from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "./ui/input"
import { CheckCircle, ChevronLeft, ChevronRight, CircleAlert, Search, Trash, type LucideIcon } from "lucide-react"
import { useConfirm } from "@renderer/hooks/use-confirm"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  filterKey: string,
  onDelete: (rows: Row<TData>[]) => void,
  disabled?: boolean,
  headerTitle?: string,
  headerIcon?: LucideIcon,
}

const FILTER_LABELS: Record<string, string> = {
  name: "nome",
  category: "categoria",
  amount: "valor",
  createdAt: "data de criação",
  payee: "beneficiário"
};

export function DataTable<TData, TValue>({
  columns,
  data,
  filterKey,
  onDelete,
  disabled,
  headerTitle,
  headerIcon: Icon,
}: DataTableProps<TData, TValue>) {
  const [ConfirmDialog, confirm] = useConfirm(
    "Tem certeza?",
    "Você vai apagar muitos registros permanentemente."
  )
  
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = React.useState({})
    
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
        sorting,
        columnFilters,
        rowSelection,
    }
  })

  return (
    <div>
      <ConfirmDialog />
      <div className="rounded-xl border border-slate-300 overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between flex-wrap gap-3 px-7 py-5 border-b border-slate-200">
            {headerTitle && (
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2.5">
                    {Icon && <Icon className="size-5 text-[#2d4a7a]" />}
                    {headerTitle}
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-0.5 rounded-full">
                        {table.getFilteredRowModel().rows.length}
                    </span>
                </h3>
            )}
            <div className="flex items-center gap-2.5 flex-wrap">
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <Input
                        placeholder={`Filtrar ${FILTER_LABELS[filterKey] ?? filterKey}...`}
                        value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn(filterKey)?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm pl-10 h-9 rounded-lg border-slate-200 bg-slate-50 focus:bg-white focus:border-[#2d4a7a] focus:ring-2 focus:ring-[#2d4a7a]/10"
                    />
                </div>
                {table.getFilteredRowModel().rows.length > 0 && (
                    <span className="text-[13px] text-slate-500 font-medium px-3.5 py-1.5 bg-slate-50 rounded-full border border-slate-200">
                        {table.getFilteredRowModel().rows.length} resultados
                    </span>
                )}
                {table.getFilteredSelectedRowModel().rows.length > 0 && (
                    <Button
                        disabled={disabled}
                        size="sm"
                        variant="outline"
                        className="font-normal text-xs border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition"
                        onClick={async () => {
                            const ok = await confirm()
                            if (ok) {
                                onDelete(table.getFilteredSelectedRowModel().rows)
                                table.resetRowSelection()
                            }
                        }}
                    >
                        <Trash className="size-3.5 mr-1.5" />
                        Remover ({table.getFilteredSelectedRowModel().rows.length})
                    </Button>
                )}
            </div>
        </div>

        {/* Table */}
        <Table>
            <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                    return (
                    <TableHead key={header.id} style={{ width: header.getSize() }}>
                        {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                            )}
                    </TableHead>
                    )
                })}
                </TableRow>
            ))}
            </TableHeader>
            <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                >
                    {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                    ))}
                </TableRow>
                ))
            ) : (
                <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      <CircleAlert className="size-6 opacity-70 hover:opacity-100 hover:animate-pulse" />
                      <span>Não foram encontrados resultados.</span>
                  </div>
                </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>

        {/* Footer */}
        <div className="flex items-center justify-between flex-wrap gap-3 px-7 py-4 border-t border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle className="size-4 text-[#2d4a7a]" />
                <strong className="text-slate-800 font-semibold">
                    {table.getFilteredSelectedRowModel().rows.length}
                </strong>
                {" "}de{" "}
                <strong className="text-slate-800 font-semibold">
                    {table.getFilteredRowModel().rows.length}
                </strong>
                {" "}selecionado(s)
            </div>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-600 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                    <ChevronLeft className="size-4" />
                </button>
                {Array.from({ length: table.getPageCount() }, (_, i) => {
                    const isActive = i === table.getState().pagination.pageIndex
                    return (
                        <button
                            key={i}
                            onClick={() => table.setPageIndex(i)}
                            className={`px-4 py-2 border rounded-lg text-sm font-medium transition cursor-pointer ${
                                isActive
                                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                            }`}
                        >
                            {i + 1}
                        </button>
                    )
                })}
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-600 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                    <ChevronRight className="size-4" />
                </button>
            </div>
        </div>
      </div>
    </div>
  )
}
