import { Button } from "@renderer/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@renderer/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { useOpenAccount } from "../hooks/use-open-account"
import { useConfirm } from "@renderer/hooks/use-confirm"
import { useDeleteAccount } from "../api/use-delete-account"

export const Actions = ({ id }: { id: string }) => {
    const { onOpen } = useOpenAccount()

    const [ConfirmDialog, confirm] = useConfirm(
        "Tem certeza?",
        "Essa conta será removida permanentemente."
    )

    const deleteAccount = useDeleteAccount()

    const onDelete = async () => {
        if (!id) return

        const ok = await confirm()

        if (ok) {
            deleteAccount.mutate({ id })
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