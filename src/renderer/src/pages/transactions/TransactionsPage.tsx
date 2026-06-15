import { DashboardLayout } from "@/pages/dashboard/components/layout";


import { Button } from "@renderer/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@renderer/components/ui/card";
import { Loader2, Plus } from "lucide-react";

import { DataTable } from "@renderer/components/data-table";
import { Skeleton } from "@renderer/components/ui/skeleton";
import { useNewTransaction } from "./hooks/use-new-transaction";
import { useBulkDeleteTransactions } from "./api/use-bulk-delete-transactions";
import { useGetTransactions } from "./api/use-get-transactions";
import { columns } from "./components/columns";
import { useState } from "react";
import { UploadButton } from "./components/upload-button";
import { ImportCard } from "./components/import-card";

enum VARIANTS {
    LIST = 'LIST',
    IMPORT = 'IMPORT',
}

const INITIAL_IMPORT_RESULTS = {
    data: [],
    errors: [],
    meta: {},
}

export default function TransactionsPage() {
    const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)
    const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS)

    const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
        console.log(results)
        setImportResults(results)
        setVariant(VARIANTS.IMPORT)
    }

    const onCancelImport = () => {
        setImportResults(INITIAL_IMPORT_RESULTS)
        setVariant(VARIANTS.LIST)
    }
    
    const newTransaction = useNewTransaction()
    const deleteTransactions = useBulkDeleteTransactions()
    const { transactions, isLoading, error } = useGetTransactions()

    const isDisabled = isLoading
    
    if (isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-10">
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
    
    if (variant === VARIANTS.IMPORT) {
        return (
            <DashboardLayout>
                <ImportCard 
                    data={importResults.data}
                    onCancel={onCancelImport}
                    onSubmit={() => {}}
                />
            </DashboardLayout>
        )
    }
    
    return (
        <DashboardLayout>
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-10">
                <Card>
                    <CardHeader className="flex flex-col gap-x-2 gap-y-2 lg:flex-row lg:items-center lg:justify-between w-full">
                        <CardTitle className="text-xl font-bold line-clamp-1">
                            Módulo de Transações
                        </CardTitle>
                        <Button onClick={newTransaction.onOpen} size="sm" className="w-full lg:w-auto lg:ml-auto p-4">
                            <Plus className="size-4 mr-2" />
                            Adicionar
                        </Button>
                        <UploadButton onUpload={onUpload} />
                    </CardHeader>
                    <CardContent>
                        <DataTable onDelete={(row) => {
                            const ids = row.map((r) => r.original.id)
                            deleteTransactions.mutate({ ids })
                        }} filterKey="payee" columns={columns} data={transactions} disabled={isDisabled} />
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}