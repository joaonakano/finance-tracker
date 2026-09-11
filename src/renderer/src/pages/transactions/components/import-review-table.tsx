import { useMemo, useState } from "react"
import { format } from "date-fns"

import { BulkCreateTransactionItem } from "@shared/types"

import { Button } from "@renderer/components/ui/button"
import { Checkbox } from "@renderer/components/ui/checkbox"
import { Select } from "@renderer/components/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@renderer/components/ui/table"
import { cn, convertAmountFromMiliunits, formatCurrency } from "@renderer/lib/utils"

import { useGetAccounts } from "@/pages/accounts/api/use-get-accounts"
import { useCreateAccount } from "@/pages/accounts/api/use-create-account"
import { useGetCategories } from "@/pages/categories/api/use-get-categories"
import { useCreateCategory } from "@/pages/categories/api/use-create-category"

export type ParsedImportRow = {
    amount: number
    payee: string
    date: string
    notes?: string | null
}

type Props = {
    rows: ParsedImportRow[]
    onBack: () => void
    onCancel: () => void
    onSubmit: (data: BulkCreateTransactionItem[]) => void
    isSubmitting?: boolean
}

export const ImportReviewTable = ({
    rows,
    onBack,
    onCancel,
    onSubmit,
    isSubmitting,
}: Props) => {
    const { accounts } = useGetAccounts()
    const { categories } = useGetCategories()
    const createAccount = useCreateAccount()
    const createCategory = useCreateCategory()

    const [selected, setSelected] = useState<Set<number>>(
        () => new Set(rows.map((_, index) => index))
    )
    const [rowAccounts, setRowAccounts] = useState<Record<number, string | undefined>>({})
    const [rowCategories, setRowCategories] = useState<Record<number, string | undefined>>({})
    const [defaultAccountId, setDefaultAccountId] = useState<string | undefined>(undefined)
    const [defaultCategoryId, setDefaultCategoryId] = useState<string | undefined>(undefined)

    const accountOptions = useMemo(
        () => accounts.map((account) => ({ label: account.name, value: account.id })),
        [accounts]
    )

    const categoryOptions = useMemo(
        () => categories.map((category) => ({ label: category.name, value: category.id })),
        [categories]
    )

    const allSelected = selected.size === rows.length
    const someSelected = selected.size > 0

    const toggleAll = () => {
        setSelected(allSelected ? new Set() : new Set(rows.map((_, index) => index)))
    }

    const toggleRow = (index: number) => {
        setSelected((prev) => {
            const next = new Set(prev)

            if (next.has(index)) {
                next.delete(index)
            } else {
                next.add(index)
            }

            return next
        })
    }

    const applyDefaultAccountToAll = () => {
        if (!defaultAccountId) return
        setRowAccounts(Object.fromEntries(rows.map((_, index) => [index, defaultAccountId])))
    }

    const applyDefaultCategoryToAll = () => {
        setRowCategories(Object.fromEntries(rows.map((_, index) => [index, defaultCategoryId])))
    }

    const handleCreateDefaultAccount = (name: string) => {
        createAccount.mutate({ name }, {
            onSuccess: (account) => setDefaultAccountId(account.id),
        })
    }

    const handleCreateDefaultCategory = (name: string) => {
        createCategory.mutate({ name }, {
            onSuccess: (category) => setDefaultCategoryId(category.id),
        })
    }

    const handleCreateRowAccount = (index: number, name: string) => {
        createAccount.mutate({ name }, {
            onSuccess: (account) =>
                setRowAccounts((prev) => ({ ...prev, [index]: account.id })),
        })
    }

    const handleCreateRowCategory = (index: number, name: string) => {
        createCategory.mutate({ name }, {
            onSuccess: (category) =>
                setRowCategories((prev) => ({ ...prev, [index]: category.id })),
        })
    }

    const selectedIndexes = Array.from(selected)
    const missingAccountCount = selectedIndexes.filter((index) => !rowAccounts[index]).length
    const canSubmit = someSelected && missingAccountCount === 0

    const handleSubmit = () => {
        const data: BulkCreateTransactionItem[] = selectedIndexes
            .sort((a, b) => a - b)
            .map((index) => {
                const row = rows[index]

                return {
                    amount: row.amount,
                    payee: row.payee,
                    date: row.date,
                    notes: row.notes ?? null,
                    account_id: rowAccounts[index] as string,
                    category_id: rowCategories[index] ?? null,
                }
            })

        onSubmit(data)
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                    <Button type="button" variant="outline" size="sm" onClick={toggleAll}>
                        {allSelected ? "Desmarcar todas" : "Selecionar todas"}
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        {selected.size} de {rows.length} selecionadas
                    </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <Button type="button" variant="ghost" size="sm" onClick={onBack}>
                        Voltar
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        disabled={!canSubmit || isSubmitting}
                        onClick={handleSubmit}
                    >
                        Importar {selected.size} transaç{selected.size === 1 ? "ão" : "ões"}
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row rounded-lg border border-dashed p-3">
                <div className="flex-1 flex flex-col gap-1.5 sm:flex-row sm:items-end sm:gap-2">
                    <div className="flex-1 space-y-1.5">
                        <span className="text-xs font-medium text-muted-foreground">
                            Conta padrão
                        </span>
                        <Select
                            placeholder="Selecionar conta"
                            options={accountOptions}
                            value={defaultAccountId}
                            onChange={setDefaultAccountId}
                            onCreate={handleCreateDefaultAccount}
                        />
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={!defaultAccountId}
                        onClick={applyDefaultAccountToAll}
                    >
                        Aplicar a todas
                    </Button>
                </div>
                <div className="flex-1 flex flex-col gap-1.5 sm:flex-row sm:items-end sm:gap-2">
                    <div className="flex-1 space-y-1.5">
                        <span className="text-xs font-medium text-muted-foreground">
                            Categoria padrão
                        </span>
                        <Select
                            placeholder="Sem categoria"
                            options={categoryOptions}
                            value={defaultCategoryId}
                            onChange={setDefaultCategoryId}
                            onCreate={handleCreateDefaultCategory}
                        />
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={applyDefaultCategoryToAll}
                    >
                        Aplicar a todas
                    </Button>
                </div>
            </div>

            <div className="rounded-sm border overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead className="w-10">
                                <Checkbox
                                    checked={allSelected}
                                    onCheckedChange={toggleAll}
                                    aria-label="Selecionar todas"
                                />
                            </TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Beneficiário</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Observações</TableHead>
                            <TableHead className="min-w-48">Conta</TableHead>
                            <TableHead className="min-w-48">Categoria</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((row, index) => {
                            const isSelected = selected.has(index)

                            return (
                                <TableRow key={index} className={cn(!isSelected && "opacity-40")}>
                                    <TableCell>
                                        <Checkbox
                                            checked={isSelected}
                                            onCheckedChange={() => toggleRow(index)}
                                            aria-label="Selecionar linha"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(row.date + "T00:00:00"), "dd/MM/yyyy")}
                                    </TableCell>
                                    <TableCell className="max-w-40 truncate">
                                        {row.payee}
                                    </TableCell>
                                    <TableCell>
                                        {formatCurrency(convertAmountFromMiliunits(row.amount))}
                                    </TableCell>
                                    <TableCell className="max-w-48 truncate text-muted-foreground">
                                        {row.notes || "-"}
                                    </TableCell>
                                    <TableCell className="min-w-48">
                                        <Select
                                            placeholder="Selecionar conta"
                                            options={accountOptions}
                                            value={rowAccounts[index]}
                                            onChange={(value) =>
                                                setRowAccounts((prev) => ({ ...prev, [index]: value }))
                                            }
                                            onCreate={(name) => handleCreateRowAccount(index, name)}
                                            disabled={!isSelected}
                                        />
                                    </TableCell>
                                    <TableCell className="min-w-48">
                                        <Select
                                            placeholder="Sem categoria"
                                            options={categoryOptions}
                                            value={rowCategories[index]}
                                            onChange={(value) =>
                                                setRowCategories((prev) => ({ ...prev, [index]: value }))
                                            }
                                            onCreate={(name) => handleCreateRowCategory(index, name)}
                                            disabled={!isSelected}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>

            {missingAccountCount > 0 && (
                <p className="text-sm text-rose-600">
                    {missingAccountCount} transaç{missingAccountCount === 1 ? "ão selecionada está" : "ões selecionadas estão"} sem conta atribuída.
                    Atribua uma conta (ou use "Conta padrão" acima) para poder importar.
                </p>
            )}
        </div>
    )
}
