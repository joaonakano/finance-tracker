import { Button } from "@renderer/components/ui/button"
import { Checkbox } from "@renderer/components/ui/checkbox"
import { TransactionWithRelations } from "@shared/types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, TrendingDown, TrendingUp } from "lucide-react"
import { Actions } from "./actions"
import { format } from "date-fns"
import { cn, formatCurrency } from "@renderer/lib/utils"
import { AccountColumn } from "./account-column"
import { CategoryColumn } from "./category-column"

export const columns: ColumnDef<TransactionWithRelations>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex justify-center px-0 py-8 w-full rounded-none">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
    {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          className="px-2 py-10 w-full hover:bg-(--hover-header-color) justify-start rounded-none"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue("date") as string
      return format(new Date(date + "T00:00:00"), "dd/MM/yyyy")
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          className="px-2 py-10 w-full hover:bg-(--hover-header-color) justify-start rounded-none"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Categoria
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <CategoryColumn
          id={row.original.id}
          category={row.original.category}
          categoryId={row.original.category_id}
        />
      )
    },
  },
  {
    accessorKey: "payee",
    header: ({ column }) => {
      return (
        <Button
          className="px-2 py-10 w-full hover:bg-(--hover-header-color) justify-start rounded-none"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Beneficiário
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          className="px-2 py-10 w-full hover:bg-(--hover-header-color) justify-start rounded-none"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const isIncome = amount >= 0

      return (
        <div className={cn(
          "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-sm font-semibold",
          isIncome
            ? "bg-emerald-50 text-emerald-700"
            : "bg-rose-50 text-rose-700"
        )}>
          {isIncome
            ? <TrendingUp className="size-3.5" />
            : <TrendingDown className="size-3.5" />
          }
          {formatCurrency(amount)}
        </div>
    )
    },
  },
  {
    accessorKey: "account",
    header: ({ column }) => {
      return (
        <Button
          className="px-2 py-10 w-full hover:bg-(--hover-header-color) justify-start rounded-none"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Conta
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <AccountColumn 
          account={row.original.account}
          accountId={row.original.account_id}
        />
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Actions id={row.original.id} />
    ),
    enableSorting: false,
    enableHiding: false,
  },
]
