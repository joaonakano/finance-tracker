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
    value: string
    onChange: (value: string | undefined) => void
    placeholder?: string
    disabled?: boolean
}

export const AmountInput = ({
    value,
    onChange,
    placeholder,
    disabled,
}: Props) => {
    const parsedValue = parseFloat(value)
    const isIncome = parsedValue > 0
    const isExpense = parsedValue < 0

    const onReverseValue = () => {
        if (!value) return
        
        const newValue = parseFloat(value) * -1
        onChange(newValue.toString())
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
                                {!parsedValue && <Info className="size-4 text-white" />}
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
                    value={value}
                    decimalsLimit={2}
                    decimalScale={2}
                    onValueChange={onChange}
                    disabled={disabled}
                    decimalSeparator="."
                    groupSeparator=","
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