import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"

import { useConfirm } from "@/hooks/use-confirm"
import { Loader2 } from "lucide-react"
import { useOpenCategory } from "../hooks/use-open-category"
import { useGetCategory } from "../api/use-get-category"
import { useUpdateCategory } from "../api/use-update-category"
import { useDeleteCategory } from "../api/use-delete-category"
import { CategoryForm, CategoryFormValues } from "./category-form"

export const EditCategorySheet = () => {
    const { isOpen, onClose, id } = useOpenCategory()
    const categoryQuery = useGetCategory(id)
    const [ConfirmDialog, confirm] = useConfirm(
        "Tem certeza?",
        "Essa categoria será removida permanentemente."
    )
    const updateCategory = useUpdateCategory({
        onSuccess: onClose,
    })
    const deleteCategory = useDeleteCategory({
        onSuccess: onClose,
    })

    const isPending = updateCategory.isPending || deleteCategory.isPending
    const isDisabled = categoryQuery.isLoading || isPending

    const onSubmit = (values: CategoryFormValues) => {
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
                        <SheetTitle>Editar Categoria</SheetTitle>
                        <SheetDescription>
                            Altere os dados da categoria selecionada.
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
                                defaultValues={categoryQuery.category ? {
                                    name: categoryQuery.category.name,
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
