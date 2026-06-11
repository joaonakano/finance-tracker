import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@renderer/components/ui/button";
import { DashboardLayout } from "./components/layout";
import { useGetAccounts } from "../accounts/api/use-get-accounts";
import { useNewAccount } from "../accounts/hooks/use-new-account";

export default function Home() {
    const { accounts, isLoading, error, accountId } = useGetAccounts()
    const queryClient = useQueryClient()
    const [name, setName] = useState("")
    const [plaidId, setPlaidId] = useState("")

    const createAccount = useMutation({
        mutationFn: async () => {
            if (!accountId) {
                throw new Error("Usuario nao encontrado")
            }

            return window.api.accounts.create({
                user_id: accountId,
                name,
                plaid_id: plaidId || null
            })
        },
        onSuccess: () => {
            setName("")
            setPlaidId("")
            queryClient.invalidateQueries({ queryKey: ["accounts", accountId] })
        }
    })

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!name.trim()) {
            return
        }

        createAccount.mutate()
    }

    if (isLoading) return <div>Carregando contas...</div>
    if (error) return <div>Erro: {error.message}</div>

    const { onOpen } = useNewAccount()

    return (
        <DashboardLayout>
            <Button onClick={onOpen}>
                Adicionar uma conta    
            </Button>

            <section className="mx-auto mt-8 max-w-xl space-y-6">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 rounded-lg border bg-card p-4"
                >
                    <div>
                        <h1 className="text-lg font-semibold">Teste de contas</h1>
                        <p className="text-sm text-muted-foreground">
                            Crie uma conta local usando UUID como id.
                        </p>
                    </div>

                    <label className="block space-y-1 text-sm font-medium">
                        <span>Nome da conta</span>
                        <input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="Carteira principal"
                        />
                    </label>

                    <label className="block space-y-1 text-sm font-medium">
                        <span>Plaid ID opcional</span>
                        <input
                            value={plaidId}
                            onChange={(event) => setPlaidId(event.target.value)}
                            className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="plaid_123"
                        />
                    </label>

                    <Button
                        type="submit"
                        disabled={createAccount.isPending || !name.trim()}
                    >
                        {createAccount.isPending ? "Salvando..." : "Adicionar conta"}
                    </Button>

                    {createAccount.error ? (
                        <p className="text-sm text-destructive">
                            {createAccount.error.message}
                        </p>
                    ) : null}
                </form>

                <div className="space-y-2">
                    <h2 className="text-sm font-medium">Contas cadastradas</h2>
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
