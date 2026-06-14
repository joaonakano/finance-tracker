import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"

import { useConfirm } from "@/hooks/use-confirm"
import { Loader2 } from "lucide-react"

import { TransactionForm, TransactionFormValues } from "./transaction-form"
import { useOpenTransaction } from "../hooks/use-open-transaction"
import { useGetTransaction } from "../api/use-get-transaction"
import { useUpdateTransaction } from "../api/use-update-transaction"
import { useDeleteTransaction } from "../api/use-delete-transaction"

export const EditTransactionSheet = () => {
    const { isOpen, onClose, id } = useOpenTransaction()
    const transactionQuery = useGetTransaction(id)
    const [ConfirmDialog, confirm] = useConfirm(
        "Tem certeza?",
        "Essa transação será removida permanentemente."
    )
    const updateTransaction = useUpdateTransaction({
        onSuccess: onClose,
    })
    const deleteTransaction = useDeleteTransaction({
        onSuccess: onClose,
    })

    const isPending = updateTransaction.isPending || deleteTransaction.isPending
    const isDisabled = transactionQuery.isLoading || isPending

    const onSubmit = (values: TransactionFormValues) => {
        if (!id) return

        updateTransaction.mutate({
            id,
            ...values,
        })
    }

    const onDelete = async () => {
        if (!id) return

        const ok = await confirm()

        if (ok) {
            deleteTransaction.mutate({ id })
        }
    }

    const defaultValues = transactionQuery.transaction
        ? {
            amount: transactionQuery.transaction.amount,
            payee: transactionQuery.transaction.payee,
            notes: transactionQuery.transaction.notes,
            date: transactionQuery.transaction.date,
            account_id: transactionQuery.transaction.account_id,
            category_id: transactionQuery.transaction.category_id,
        }
        : undefined

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
                        {transactionQuery.isLoading ? (
                            <div className="flex h-40 items-center justify-center">
                                <Loader2 className="size-6 animate-spin text-slate-300" />
                            </div>
                        ) : (
                            <TransactionForm
                                id={id}
                                defaultValues={defaultValues}
                                onSubmit={onSubmit}
                                onDelete={onDelete}
                                disabled={isDisabled}
                            />
                        )}

                        {transactionQuery.error ? (
                            <p className="mt-3 text-sm text-destructive">
                                {transactionQuery.error.message}
                            </p>
                        ) : null}
                        {updateTransaction.error ? (
                            <p className="mt-3 text-sm text-destructive">
                                {updateTransaction.error.message}
                            </p>
                        ) : null}
                        {deleteTransaction.error ? (
                            <p className="mt-3 text-sm text-destructive">
                                {deleteTransaction.error.message}
                            </p>
                        ) : null}
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}
