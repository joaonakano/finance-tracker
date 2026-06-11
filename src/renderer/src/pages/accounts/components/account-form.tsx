import { FormEvent, useState } from "react";
import { Trash } from "lucide-react";

import { Button } from "@renderer/components/ui/button";
import { Input } from "@renderer/components/ui/input";

export type AccountFormValues = {
    name: string
}

type Props = {
    id?: string
    defaultValues?: AccountFormValues
    onSubmit: (values: AccountFormValues) => void
    onDelete?: () => void
    disabled?: boolean
}

export const AccountForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
}: Props) => {
    const [name, setName] = useState(defaultValues?.name ?? "")

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const trimmedName = name.trim()

        if (!trimmedName) {
            return
        }

        onSubmit({ name: trimmedName })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block space-y-1.5 text-sm font-medium">
                <span>Nome</span>
                <Input
                    disabled={disabled}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Ex: Dinheiro, Banco, Cartao"
                />
            </label>

            <Button
                type="submit"
                className="w-full"
                disabled={disabled || !name.trim()}
            >
                {id ? "Salvar alteracoes" : "Criar conta"}
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
                    Excluir conta
                </Button>
            )}
        </form>
    )
}
