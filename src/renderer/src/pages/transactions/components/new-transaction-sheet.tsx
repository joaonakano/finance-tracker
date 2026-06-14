import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { CategoryForm, CategoryFormValues } from "./category-form";
import { useNewTransaction } from "../hooks/use-new-transaction";
import { useCreateTransaction } from "../api/use-create-transaction";


export const NewTransactionSheet = () => {
    const { isOpen, onClose } = useNewTransaction()
    const createCategory = useCreateTransaction({
        onSuccess: onClose
    })

    const onSubmit = (values: TransactionFormValues) => {
        createCategory.mutate(values)
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
                    <SheetTitle>Nova Transação</SheetTitle>
                    <SheetDescription>
                        Crie uma nova transação para controlar suas finanças.
                    </SheetDescription>
                </SheetHeader>

                <div className="px-4">
                    <CategoryForm
                        onSubmit={onSubmit}
                        disabled={createCategory.isPending}
                    />

                    {createCategory.error ? (
                        <p className="mt-3 text-sm text-destructive">
                            {createCategory.error.message}
                        </p>
                    ) : null}
                </div>
            </SheetContent>
        </Sheet>
    )
}
