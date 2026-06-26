import { Button } from "@renderer/components/ui/button"
import { Checkbox } from "@renderer/components/ui/checkbox"
import { Account } from "@shared/types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Actions } from "./actions"

export const columns: ColumnDef<Account>[] = [
  {
    id: "select",
    size: 0,
    header: ({ table }) => (
      <div className="flex justify-center px-0 py-8 w-full rounded-none">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="border-muted-foreground"
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
    accessorKey: "name",
    size: 200,
    header: ({ column }) => {
      return (
        <Button
          className="px-2 py-10 w-full hover:bg-(--hover-header-color) justify-start rounded-none text-muted-foreground"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    size: 60,
    cell: ({ row }) => (
      <Actions id={row.original.id} />
    ),
    enableSorting: false,
    enableHiding: false,
  },
]
