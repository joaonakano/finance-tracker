
import { Button } from "@renderer/components/ui/button";
import { Plus, Tags } from "lucide-react";

import { DataTable } from "@renderer/components/data-table";
import { Skeleton } from "@renderer/components/ui/skeleton";
import { useNewCategory } from "./hooks/use-new-category";
import { useBulkDeleteCategories } from "./api/use-bulk-delete-categories";
import { useGetCategories } from "./api/use-get-categories";
import { columns } from "./components/columns";
import { DashboardLayout } from "@renderer/components/layout";
import { AccountFilter } from "@renderer/components/account-filter";



export default function CategoriesPage() {
    const newCategory = useNewCategory()
    const deleteCategories = useBulkDeleteCategories()
    
    const { categories, isLoading, error } = useGetCategories()

    const isDisabled = isLoading
    
    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="pb-10 space-y-4">
                    <Skeleton className="h-10 w-40" />
                    <Skeleton className="h-96 w-full rounded-xl" />
                </div>
            </DashboardLayout>
        )        
    }
    if (error) return <DashboardLayout><div className="pb-10">Erro: {error.message}</div></DashboardLayout>
    
    return (
        <DashboardLayout>
            <div className="pb-10 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <AccountFilter />
                    <Button onClick={newCategory.onOpen} className="w-full lg:w-auto gap-2 rounded-lg">
                        <Plus className="size-4" />
                        Adicionar nova categoria
                    </Button>
                </div>
                <DataTable
                    onDelete={(row) => {
                        const ids = row.map((r) => r.original.id)
                        deleteCategories.mutate({ ids })
                    }}
                    filterKey="name"
                    columns={columns}
                    data={categories}
                    disabled={isDisabled}
                    headerTitle="Categorias"
                    headerIcon={Tags}
                />
            </div>
        </DashboardLayout>
    )
}
