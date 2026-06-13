import { Button } from "@renderer/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@renderer/components/ui/dropdown-menu"
import { Edit, MoreHorizontal } from "lucide-react"
import { useOpenAccount } from "../hooks/use-open-account"

export const Actions = ({ id }: { id: string }) => {
  const { onOpen } = useOpenAccount()

  return (
    <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    disabled={false}
                    onClick={() => onOpen(id)}
                    >
                    <Edit className="size-4 mr-2"/>
                    Editar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
  )
}