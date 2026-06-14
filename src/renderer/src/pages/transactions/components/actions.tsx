import { Button } from "@renderer/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@renderer/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash } from "lucide-react"

import { useConfirm } from "@renderer/hooks/use-confirm"
import { useOpenTransaction } from "../hooks/use-open-transaction"
import { useDeleteTransaction } from "../api/use-delete-transaction"

export const Actions = ({ id }: { id: string }) => {
    const { onOpen } = useOpenTransaction()

    const [ConfirmDialog, confirm] = useConfirm(
        "Tem certeza?",
        "Essa transação será removida permanentemente."
    )

    const deleteTransaction = useDeleteTransaction()

    const onDelete = async () => {
        if (!id) return

        const ok = await confirm()

        if (ok) {
            deleteTransaction.mutate({ id })
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
