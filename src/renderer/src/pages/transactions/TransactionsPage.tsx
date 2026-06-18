
import { BulkCreateTransactionItem } from "@shared/types"

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
import { useSelectAccount } from "../accounts/hooks/use-select-account";
import { useAccountFilter } from "@renderer/hooks/use-account-filter";
import { useDateFilter } from "@renderer/hooks/use-date-filter";
import { format } from "date-fns";
import { toast } from "sonner";
import { useBulkCreateTransactions } from "./api/use-bulk-create-transactions";
import { DashboardLayout } from "@renderer/components/layout";

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
    const [accountDialog, confirm] = useSelectAccount()
    const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)
    const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS)
 
    const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
        setImportResults(results)
        setVariant(VARIANTS.IMPORT)
    }
 
    const onCancelImport = () => {
        setImportResults(INITIAL_IMPORT_RESULTS)
        setVariant(VARIANTS.LIST)
    }
    
    const newTransaction = useNewTransaction()
    const createTransactions = useBulkCreateTransactions()
    const deleteTransactions = useBulkDeleteTransactions()
    const { accountId: filterAccountId } = useAccountFilter()
    const { from, to } = useDateFilter()
    const { transactions, isLoading, error } = useGetTransactions({
        account_id: filterAccountId !== "all" ? filterAccountId : undefined,
        start_date: format(from, "yyyy-MM-dd"),
        end_date: format(to, "yyyy-MM-dd"),
    })
 
    const onSubmitImport = async (values: BulkCreateTransactionItem[]): Promise<void> => {
        const accountId = await confirm()
 
        if (!accountId) {
            toast.error("Selecione uma conta para continuar.")
            return
        }
 
        const data: BulkCreateTransactionItem[] = values.map((value) => ({
            ...value,
            account_id: accountId as string
        }))
 
        createTransactions.mutate({ transactions: data }, {
            onSuccess: () => onCancelImport()
        })
    }
    
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
    
    if (variant === VARIANTS.IMPORT) {
        return (
            <>
                {accountDialog}
                <DashboardLayout>
                    <ImportCard 
                        data={importResults.data}
                        onCancel={onCancelImport}
                        onSubmit={onSubmitImport}
                    />
                </DashboardLayout>
            </>
        )
    }
    
    return (
        <DashboardLayout>
            {accountDialog}
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-20">
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
                        <DataTable
                            onDelete={(row) => {
                                const ids = row.map((r) => r.original.id)
                                deleteTransactions.mutate({ ids })
                            }}
                            filterKey="payee"
                            columns={columns}
                            data={transactions}
                            disabled={isLoading}
                        />
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
