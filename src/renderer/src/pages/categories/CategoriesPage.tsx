
import { Button } from "@renderer/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@renderer/components/ui/card";
import { Loader2, Plus } from "lucide-react";


import { DataTable } from "@renderer/components/data-table";
import { Skeleton } from "@renderer/components/ui/skeleton";
import { useNewCategory } from "./hooks/use-new-category";
import { useBulkDeleteCategories } from "./api/use-bulk-delete-categories";
import { useGetCategories } from "./api/use-get-categories";
import { columns } from "./components/columns";
import { DashboardLayout } from "@renderer/components/layout";



export default function CategoriesPage() {
    const newCategory = useNewCategory()
    const deleteCategories = useBulkDeleteCategories()
    
    const { categories, isLoading, error } = useGetCategories()

    const isDisabled = isLoading
    
    if (isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-20">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-48"/>
                    </CardHeader>
                    <CardContent>
                        <div className="h-125 w-full flex items-center justify-center">
                            <Loader2 className="size-6 text-slate-300 animate-spin" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )        
    }
    if (error) return <div>Erro: {error.message}</div>
    
    return (
        <DashboardLayout>
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-20">
                <Card>
                    <CardHeader className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between w-full">
                        <CardTitle className="text-xl font-bold line-clamp-1">
                            Módulo de Categorias
                        </CardTitle>
                        <Button onClick={newCategory.onOpen} size="sm" className="w-full lg:w-auto lg:ml-auto p-4">
                            <Plus className="size-4 mr-2" />
                            Adicionar nova
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <DataTable onDelete={(row) => {
                            const ids = row.map((r) => r.original.id)
                            deleteCategories.mutate({ ids })
                            console.log({ ids })
                        }} filterKey="name" columns={columns} data={categories} disabled={isDisabled} />
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}