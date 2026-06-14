import { FormEvent, useEffect, useMemo, useState } from "react";
import { Trash } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@renderer/components/ui/button";
import { Input } from "@renderer/components/ui/input";
import { Select } from "@/components/select";

import { useGetAccounts } from "@/pages/accounts/api/use-get-accounts";
import { useGetCategories } from "@/pages/categories/api/use-get-categories";
import { useCreateAccount } from "@/pages/accounts/api/use-create-account";
import { useCreateCategory } from "@/pages/categories/api/use-create-category";
import { DatePicker } from "@renderer/components/date-picker";
import { Textarea } from "@renderer/components/ui/textarea";

export type TransactionFormValues = {
    amount: number
    payee: string
    notes?: string | null
    date: string
    account_id: string
    category_id?: string | null
}

type Props = {
    id?: string
    defaultValues?: TransactionFormValues
    onSubmit: (values: TransactionFormValues) => void
    onDelete?: () => void
    disabled?: boolean
}

export const TransactionForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
}: Props) => {
    const { accounts } = useGetAccounts()
    const { categories } = useGetCategories()
    const createAccount = useCreateAccount()
    const createCategory = useCreateCategory()

    const [amount, setAmount] = useState(defaultValues?.amount?.toString() ?? "")
    const [payee, setPayee] = useState(defaultValues?.payee ?? "")
    const [notes, setNotes] = useState(defaultValues?.notes ?? "")
    const [date, setDate] = useState(defaultValues?.date ?? new Date().toISOString().slice(0, 10))
    const [accountId, setAccountId] = useState(defaultValues?.account_id ?? "")
    const [categoryId, setCategoryId] = useState(defaultValues?.category_id ?? "")

    useEffect(() => {
        setAmount(defaultValues?.amount?.toString() ?? "")
        setPayee(defaultValues?.payee ?? "")
        setNotes(defaultValues?.notes ?? "")
        setDate(defaultValues?.date ?? new Date().toISOString().slice(0, 10))
        setAccountId(defaultValues?.account_id ?? "")
        setCategoryId(defaultValues?.category_id ?? "")
    }, [defaultValues])

    const accountOptions = useMemo(() =>
        accounts.map((account) => ({
            label: account.name,
            value: account.id,
        })),
        [accounts]
    )

    const categoryOptions = useMemo(() =>
        categories.map((category) => ({
            label: category.name,
            value: category.id,
        })),
        [categories]
    )

    const handleCreateAccount = (name: string) => {
        createAccount.mutate(
            { name },
            {
                onSuccess: (account) => {
                    setAccountId(account.id)
                },
            }
        )
    }

    const handleCreateCategory = (name: string) => {
        createCategory.mutate(
            { name },
            {
                onSuccess: (category) => {
                    setCategoryId(category.id)
                },
            }
        )
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const trimmedPayee = payee.trim()
        const numericAmount = parseFloat(amount)

        if (!trimmedPayee || isNaN(numericAmount) || !accountId) {
            return
        }

        onSubmit({
            amount: numericAmount,
            payee: trimmedPayee,
            notes: notes.trim() || null,
            date,
            account_id: accountId,
            category_id: categoryId || null,
        })
    }

    const parsedDate = useMemo(() => {
        return date ? new Date(date + "T00:00:00") : undefined
    }, [date])

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block space-y-1.5 text-sm font-medium">
                <span>Data</span>
                <DatePicker
                    value={parsedDate}
                    onChange={(day) => setDate(day ? format(day, "yyyy-MM-dd") : "")}
                    disabled={disabled}
                />
            </label>

            <label className="block space-y-1.5 text-sm font-medium">
                <span>Valor</span>
                <Input
                    disabled={disabled}
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    placeholder="Valor da transação"
                    className="font-normal"
                    required
                />
            </label>

            <label className="block space-y-1.5 text-sm font-medium">
                <span>Beneficiário</span>
                <Input
                    disabled={disabled}
                    value={payee}
                    onChange={(event) => setPayee(event.target.value)}
                    placeholder="Ex: Mercado, Banco, etc."
                    className="font-normal"
                    required
                />
            </label>

            <label className="block space-y-1.5 text-sm font-medium">
                <span>Observações</span>
                <Textarea
                    disabled={disabled}
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    className="font-normal"
                    placeholder="Notas opcionais"
                />
            </label>

            <label className="block space-y-1.5 text-sm font-medium">
                <span>Conta</span>
                <Select
                    placeholder="Selecionar conta"
                    options={accountOptions}
                    value={accountId}
                    onChange={(value) => setAccountId(value ?? "")}
                    onCreate={handleCreateAccount}
                    disabled={disabled}
                />
            </label>

            <label className="block space-y-1.5 text-sm font-medium">
                <span>Categoria</span>
                <Select
                    placeholder="Sem categoria"
                    options={categoryOptions}
                    value={categoryId}
                    onChange={(value) => setCategoryId(value ?? "")}
                    onCreate={handleCreateCategory}
                    disabled={disabled}
                />
            </label>

            <Button
                type="submit"
                className="w-full"
                disabled={disabled || !payee.trim() || !amount.trim() || !accountId}
            >
                {id ? "Salvar alterações" : "Criar transação"}
            </Button>

            {!!id && (
                <Button
                    type="button"
                    disabled={disabled}
                    onClick={onDelete}
                    className="w-full"
                    variant="outline"
                >
                    <Trash className="mr-2 size-4" />
                    Excluir transação
                </Button>
            )}
        </form>
    )
}
