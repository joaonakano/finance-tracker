
import { BulkCreateTransactionItem } from "@shared/types"

import { Button } from "@renderer/components/ui/button";
import { Loader2, Plus, ArrowLeftRight } from "lucide-react";

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
import { AccountFilter } from "@renderer/components/account-filter";

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
            <DashboardLayout>
                <div className="pb-10 space-y-4">
                    <Skeleton className="h-10 w-60" />
                    <Skeleton className="h-96 w-full rounded-xl" />
                </div>
            </DashboardLayout>
        )        
    }
    if (error) return <DashboardLayout><div className="pb-10">Erro: {error.message}</div></DashboardLayout>
    
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
            <div className="pb-10 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <AccountFilter />
                    <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto">
                        <Button onClick={newTransaction.onOpen} className="w-full lg:w-auto gap-2 rounded-lg">
                            <Plus className="size-4" />
                            Adicionar transação
                        </Button>
                        <UploadButton onUpload={onUpload} />
                    </div>
                </div>
                <DataTable
                    onDelete={(row) => {
                        const ids = row.map((r) => r.original.id)
                        deleteTransactions.mutate({ ids })
                    }}
                    filterKey="payee"
                    columns={columns}
                    data={transactions}
                    disabled={isLoading}
                    headerTitle="Transações"
                    headerIcon={ArrowLeftRight}
                />
            </div>
        </DashboardLayout>
    )
}
