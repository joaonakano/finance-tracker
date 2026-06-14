import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { useNewCategory } from "../hooks/use-new-category";
import { useCreateCategory } from "../api/use-create-category";
import { CategoryForm, CategoryFormValues } from "./category-form";


export const NewCategorySheet = () => {
    const { isOpen, onClose } = useNewCategory()
    const createCategory = useCreateCategory({
        onSuccess: onClose
    })

    const onSubmit = (values: CategoryFormValues) => {
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
                    <SheetTitle>Nova Categoria</SheetTitle>
                    <SheetDescription>
                        Crie uma nova categoria para organizar suas finanças.
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
