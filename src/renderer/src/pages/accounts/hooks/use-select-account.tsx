import { useRef, useState, useCallback, useMemo } from "react";
import { useGetAccounts } from "../api/use-get-accounts";
import { useCreateAccount } from "../api/use-create-account";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select } from "@renderer/components/select";

// ✅ Componente fora do hook — identidade estável, sem remontagem a cada render
type AccountDialogProps = {
    open: boolean
    onCancel: () => void
    onConfirm: () => void
    selectValue: string | undefined
    onSelect: (value: string | undefined) => void
    accountOptions: { label: string; value: string }[]
    isLoading: boolean
    isPending: boolean
}

const AccountDialog = ({
    open,
    onCancel,
    onConfirm,
    selectValue,
    onSelect,
    accountOptions,
    isLoading,
    isPending,
}: AccountDialogProps) => (
    <Dialog open={open} onOpenChange={onCancel}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Selecione uma Conta</DialogTitle>
                <DialogDescription>
                    Selecione uma conta para continuar.
                </DialogDescription>
            </DialogHeader>
            <Select
                placeholder="Selecione uma conta"
                options={accountOptions}
                onCreate={(name) => onSelect(name)}
                onChange={onSelect}
                value={selectValue}
                disabled={isLoading || isPending}
            />
            <DialogFooter className="pt-2">
                <Button onClick={onCancel} variant="outline">
                    Cancelar
                </Button>
                <Button onClick={onConfirm}>
                    Confirmar
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
)

export const useSelectAccount = (): [React.ReactElement, () => Promise<unknown>] => {
    const accountQuery = useGetAccounts()
    const accountMutation = useCreateAccount()
 
    const onCreateAccount = useCallback((name: string) => {
        accountMutation.mutate({ name })
    }, [accountMutation])
 
    const accountOptions = useMemo(
        () => (accountQuery.accounts ?? []).map((account) => ({
            label: account.name,
            value: account.id,
        })),
        [accountQuery.accounts]
    )
 
    const [promise, setPromise] = useState<{ resolve: (value: string | undefined) => void } | null>(null)
    const [selectValue, setSelectValue] = useState<string | undefined>(undefined)
 
    const confirm = useCallback(() => new Promise((resolve) => {
        setSelectValue(undefined)
        setPromise({ resolve })
    }), [])
 
    const handleClose = useCallback(() => {
        setPromise(null)
        setSelectValue(undefined)
    }, [])
 
    const handleConfirm = useCallback(() => {
        promise?.resolve(selectValue)
        handleClose()
    }, [promise, selectValue, handleClose])
 
    const handleCancel = useCallback(() => {
        promise?.resolve(undefined)
        handleClose()
    }, [promise, handleClose])
 
    // ✅ JSX element direto — React atualiza props no lugar, sem remontar
    const dialogElement = (
        <AccountDialog
            open={promise !== null}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
            selectValue={selectValue}
            onSelect={setSelectValue}
            accountOptions={accountOptions}
            isLoading={accountQuery.isLoading}
            isPending={accountMutation.isPending}
        />
    )
 
    return [dialogElement, confirm]
}
