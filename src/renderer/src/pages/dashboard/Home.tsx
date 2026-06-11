import { Plus } from "lucide-react";

import { Button } from "@renderer/components/ui/button";
import { DashboardLayout } from "./components/layout";
import { useGetAccounts } from "../accounts/api/use-get-accounts";
import { useNewAccount } from "../accounts/hooks/use-new-account";

export default function Home() {
    const { accounts, isLoading, error } = useGetAccounts()
    const { onOpen } = useNewAccount()

    if (isLoading) return <div>Carregando contas...</div>
    if (error) return <div>Erro: {error.message}</div>

    return (
        <DashboardLayout>
            <section className="mx-auto mt-8 max-w-xl space-y-6">
                <div className="flex items-center justify-between gap-3">
                    <h1 className="text-lg font-semibold">Contas</h1>
                    <Button onClick={onOpen}>
                        <Plus className="size-4" />
                        Adicionar conta
                    </Button>
                </div>

                <div className="space-y-2">
                    {accounts.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            Nenhuma conta cadastrada ainda.
                        </p>
                    ) : (
                        <ul className="space-y-2">
                            {accounts.map((account) => (
                                <li
                                    key={account.id}
                                    className="rounded-lg border bg-card p-3 text-sm"
                                >
                                    <div className="font-medium">{account.name}</div>
                                    <div className="text-muted-foreground">{account.id}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
        </DashboardLayout>
    )
}
