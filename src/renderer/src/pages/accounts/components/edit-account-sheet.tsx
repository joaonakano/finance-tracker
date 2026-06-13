import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"

import { AccountForm, AccountFormValues } from "@/pages/accounts/components/account-form"
import { useOpenAccount } from "../hooks/use-open-account"
import { useGetAccount } from "../api/use-get-account"
import { useUpdateAccount } from "../api/use-update-account"
import { useDeleteAccount } from "../api/use-delete-account"
import { useConfirm } from "@/hooks/use-confirm"
import { Loader2 } from "lucide-react"

export const EditAccountSheet = () => {
    const { isOpen, onClose, id } = useOpenAccount()
    const accountQuery = useGetAccount(id)
    const [ConfirmDialog, confirm] = useConfirm(
        "Tem certeza?",
        "Essa conta será removida permanentemente."
    )
    const updateAccount = useUpdateAccount({
        onSuccess: onClose,
    })
    const deleteAccount = useDeleteAccount({
        onSuccess: onClose,
    })

    const isPending = updateAccount.isPending || deleteAccount.isPending
    const isDisabled = accountQuery.isLoading || isPending

    const onSubmit = (values: AccountFormValues) => {
        if (!id) return

        updateAccount.mutate({
            id,
            ...values,
        })
    }

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
            <Sheet
                open={isOpen}
                onOpenChange={(open) => {
                    if (!open) onClose()
                }}
            >
                <SheetContent className="pt-4">
                    <SheetHeader>
                        <SheetTitle>Editar Conta</SheetTitle>
                        <SheetDescription>
                            Altere os dados da conta selecionada.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="px-4">
                        {accountQuery.isLoading ? (
                            <div className="flex h-40 items-center justify-center">
                                <Loader2 className="size-6 animate-spin text-slate-300" />
                            </div>
                        ) : (
                            <AccountForm
                                id={id}
                                defaultValues={accountQuery.account ? {
                                    name: accountQuery.account.name,
                                } : undefined}
                                onSubmit={onSubmit}
                                onDelete={onDelete}
                                disabled={isDisabled}
                            />
                        )}

                        {accountQuery.error ? (
                            <p className="mt-3 text-sm text-destructive">
                                {accountQuery.error.message}
                            </p>
                        ) : null}
                        {updateAccount.error ? (
                            <p className="mt-3 text-sm text-destructive">
                                {updateAccount.error.message}
                            </p>
                        ) : null}
                        {deleteAccount.error ? (
                            <p className="mt-3 text-sm text-destructive">
                                {deleteAccount.error.message}
                            </p>
                        ) : null}
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}
