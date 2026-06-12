import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { AccountForm, AccountFormValues } from "@/pages/accounts/components/account-form"
import { useNewAccount } from "@/pages/accounts/hooks/use-new-account";
import { useCreateAccount } from  "@/pages/accounts/api/use-create-account";

export const NewAccountSheet = () => {
    const { isOpen, onClose } = useNewAccount()
    const createAccount = useCreateAccount({
        onSuccess: onClose
    })

    const onSubmit = (values: AccountFormValues) => {
        createAccount.mutate(values)
    }

    return (
        <Sheet
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) onClose()
            }}
        >
            <SheetContent className="pt-4">
                <SheetHeader>
                    <SheetTitle>Nova Conta</SheetTitle>
                    <SheetDescription>
                        Crie uma nova conta para rastrear suas transações.
                    </SheetDescription>
                </SheetHeader>

                <div className="px-4">
                    <AccountForm
                        onSubmit={onSubmit}
                        disabled={createAccount.isPending}
                    />

                    {createAccount.error ? (
                        <p className="mt-3 text-sm text-destructive">
                            {createAccount.error.message}
                        </p>
                    ) : null}
                </div>
            </SheetContent>
        </Sheet>
    )
}
