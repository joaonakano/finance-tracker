import { useState } from "react"
import CurrencyInput from "react-currency-input-field"
import { Info, MinusCircle, PlusCircle } from "lucide-react"
import { cn } from "@renderer/lib/utils"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {
    value: number | null
    onChange: (value: number | null) => void
    placeholder?: string
    disabled?: boolean
}

export const AmountInput = ({
    value,
    onChange,
    placeholder,
    disabled,
}: Props) => {
    // O CurrencyInput é usado em modo não controlado (defaultValue) de propósito:
    // realimentar `value` a cada tecla digitada faz a biblioteca reformatar o campo
    // no meio da digitação, descartando o dígito que acabou de ser digitado (ex:
    // ao digitar "85," o valor intermediário arredonda para 85 e reformata o campo
    // para "85,00" antes do usuário terminar de digitar os centavos). O único caso
    // em que precisamos forçar um valor vindo de fora é o botão de inverter sinal,
    // tratado remontando o input via `resetKey`.
    const [resetKey, setResetKey] = useState(0)

    const isIncome = value !== null && value > 0
    const isExpense = value !== null && value < 0

    const onReverseValue = () => {
        if (value === null) return
        onChange(value * -1)
        setResetKey((key) => key + 1)
    }

    const handleValueChange = (
        _value: string | undefined,
        _name: string | undefined,
        values?: { float: number | null; formatted: string; value: string }
    ) => {
        onChange(values?.float ?? null)
    }

    return (
        <div>
            <div className="relative">
                <TooltipProvider>
                    <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                            <button
                                type="button"
                                onClick={onReverseValue}
                                disabled={disabled}
                                className={cn(
                                    "absolute left-2 top-1/2 -translate-y-1/2",
                                    "size-7 flex items-center justify-center",
                                    "rounded-sm bg-slate-400 hover:bg-slate-500",
                                    "transition-colors disabled:opacity-50",
                                    isIncome && "bg-emerald-500 hover:bg-emerald-600",
                                    isExpense && "bg-rose-500 hover:bg-rose-600"
                                )}
                            >
                                {(value === null || value === 0) && <Info className="size-4 text-white" />}
                                {isIncome && <PlusCircle className="size-4 text-white" />}
                                {isExpense && <MinusCircle className="size-4 text-white" />}
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Use [+] para receita e [-] para despesa
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <CurrencyInput
                    key={resetKey}
                    prefix="R$"
                    className={cn(
                        "flex h-9 w-full rounded-lg border border-slate-200",
                        "bg-slate-50 px-2.5 py-1 pl-10",
                        "font-normal text-sm",
                        "transition-colors outline-none",
                        "placeholder:text-muted-foreground",
                        "focus:bg-white focus:border-[#2d4a7a] focus:ring-2 focus:ring-[#2d4a7a]/10",
                        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                    )}
                    placeholder={placeholder}
                    defaultValue={value ?? undefined}
                    decimalsLimit={2}
                    decimalScale={2}
                    onValueChange={handleValueChange}
                    disabled={disabled}
                    decimalSeparator=","
                    groupSeparator="."
                    max={999999999.99}
                    maxLength={15}
                />
            </div>

            <p className="text-xs text-muted-foreground mt-2">
                {isIncome && "Será contabilizado como receita"}
                {isExpense && "Será contabilizado como despesa"}
            </p>
        </div>
    )
}
