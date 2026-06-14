import { FormEvent, useEffect, useState } from "react";
import { Trash } from "lucide-react";

import { Button } from "@renderer/components/ui/button";
import { Input } from "@renderer/components/ui/input";

export type CategoryFormValues = {
    name: string
}

type Props = {
    id?: string
    defaultValues?: CategoryFormValues
    onSubmit: (values: CategoryFormValues) => void
    onDelete?: () => void
    disabled?: boolean
}

export const CategoryForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
}: Props) => {
    const [name, setName] = useState(defaultValues?.name ?? "")

    useEffect(() => {
        setName(defaultValues?.name ?? "")
    }, [defaultValues?.name])

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
                    placeholder="Ex: Comida, Viagem, etc."
                />
            </label>

            <Button
                type="submit"
                className="w-full"
                disabled={disabled || !name.trim()}
            >
                {id ? "Salvar alterações" : "Criar categoria"}
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
                    Excluir categoria
                </Button>
            )}
        </form>
    )
}
