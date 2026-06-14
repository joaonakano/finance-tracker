import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"

import { useConfirm } from "@/hooks/use-confirm"
import { Loader2 } from "lucide-react"

import { CategoryForm, CategoryFormValues } from "./category-form"
import { useOpenTransaction } from "../hooks/use-open-transaction"
import { useGetTransaction } from "../api/use-get-transaction"
import { useUpdateTransaction } from "../api/use-update-transaction"
import { useDeleteTransaction } from "../api/use-delete-transaction"

export const EditTransactionSheet = () => {
    const { isOpen, onClose, id } = useOpenTransaction()
    const categoryQuery = useGetTransaction(id)
    const [ConfirmDialog, confirm] = useConfirm(
        "Tem certeza?",
        "Essa categoria será removida permanentemente."
    )
    const updateCategory = useUpdateTransaction({
        onSuccess: onClose,
    })
    const deleteCategory = useDeleteTransaction({
        onSuccess: onClose,
    })

    const isPending = updateCategory.isPending || deleteCategory.isPending
    const isDisabled = categoryQuery.isLoading || isPending

    const onSubmit = (values: TransactionFormValues) => {
        if (!id) return

        updateCategory.mutate({
            id,
            ...values,
        })
    }

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
            <Sheet
                open={isOpen}
                onOpenChange={(open) => {
                    if (!open) onClose()
                }}
            >
                <SheetContent className="pt-4">
                    <SheetHeader>
                        <SheetTitle>Editar Transação</SheetTitle>
                        <SheetDescription>
                            Altere os dados da transação selecionada.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="px-4">
                        {categoryQuery.isLoading ? (
                            <div className="flex h-40 items-center justify-center">
                                <Loader2 className="size-6 animate-spin text-slate-300" />
                            </div>
                        ) : (
                            <CategoryForm
                                id={id}
                                defaultValues={categoryQuery.transaction ? {
                                    name: categoryQuery.transaction,
                                } : undefined}
                                onSubmit={onSubmit}
                                onDelete={onDelete}
                                disabled={isDisabled}
                            />
                        )}

                        {categoryQuery.error ? (
                            <p className="mt-3 text-sm text-destructive">
                                {categoryQuery.error.message}
                            </p>
                        ) : null}
                        {updateCategory.error ? (
                            <p className="mt-3 text-sm text-destructive">
                                {updateCategory.error.message}
                            </p>
                        ) : null}
                        {deleteCategory.error ? (
                            <p className="mt-3 text-sm text-destructive">
                                {deleteCategory.error.message}
                            </p>
                        ) : null}
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}
