
import { useNewAccount } from "@renderer/pages/accounts/hooks/use-new-account";
import { useGetAccounts } from "@renderer/pages/accounts/api/use-get-accounts";

import { Button } from "@renderer/components/ui/button";
import { Plus, Wallet } from "lucide-react";

import { columns } from "@/pages/accounts/components/columns";

import { DataTable } from "@renderer/components/data-table";
import { Skeleton } from "@renderer/components/ui/skeleton";
import { useBulkDeleteAccounts } from "./api/use-bulk-delete-accounts";
import { DashboardLayout } from "@renderer/components/layout";
import { AccountFilter } from "@renderer/components/account-filter";

export default function AccountsPage() {
    const newAccount = useNewAccount()
    const deleteAccounts = useBulkDeleteAccounts()
    
    const { accounts, isLoading, error } = useGetAccounts()

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
                    <Button onClick={newAccount.onOpen} className="w-full lg:w-auto gap-2 rounded-lg">
                        <Plus className="size-4" />
                        Adicionar nova conta
                    </Button>
                </div>
                <DataTable
                    onDelete={(row) => {
                        const ids = row.map((r) => r.original.id)
                        deleteAccounts.mutate({ ids })
                    }}
                    filterKey="name"
                    columns={columns}
                    data={accounts}
                    disabled={isDisabled}
                    headerTitle="Minhas Contas"
                    headerIcon={Wallet}
                />
            </div>
        </DashboardLayout>
    )
}
