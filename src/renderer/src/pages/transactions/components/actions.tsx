import { Button } from "@renderer/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@renderer/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash } from "lucide-react"

import { useConfirm } from "@renderer/hooks/use-confirm"
import { useOpenCategory } from "../hooks/use-open-category"
import { useDeleteCategory } from "../api/use-delete-category"

export const Actions = ({ id }: { id: string }) => {
    const { onOpen } = useOpenCategory()

    const [ConfirmDialog, confirm] = useConfirm(
        "Tem certeza?",
        "Essa categoria será removida permanentemente."
    )

    const deleteCategory = useDeleteCategory()

    const onDelete = async () => {
        if (!id) return

        const ok = await confirm()

        if (ok) {
            deleteCategory.mutate({ id })
        }
    }

    return (
        <>
            <ConfirmDialog />
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
                        <Edit className="size-4 mr-2" />
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={false}
                        onClick={() => onDelete()}
                    >
                        <Trash className="size-4 mr-2" />
                        Excluir
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}