import { createContext, useCallback, useContext, useState, type ReactNode } from "react"
import { addMonths, endOfMonth, startOfMonth, subMonths } from "date-fns"

type DateFilterContextValue = {
    month: Date
    from: Date
    to: Date
    setMonth: (month: Date) => void
    previousMonth: () => void
    nextMonth: () => void
    goToCurrentMonth: () => void
}

const DateFilterContext = createContext<DateFilterContextValue>({
    month: startOfMonth(new Date()),
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
    setMonth: () => {},
    previousMonth: () => {},
    nextMonth: () => {},
    goToCurrentMonth: () => {},
})

export const DateFilterProvider = ({ children }: { children: ReactNode }) => {
    const [month, setMonth] = useState<Date>(() => startOfMonth(new Date()))

    const from = startOfMonth(month)
    const to = endOfMonth(month)

    const previousMonth = useCallback(() => setMonth((m) => subMonths(m, 1)), [])
    const nextMonth = useCallback(() => setMonth((m) => addMonths(m, 1)), [])
    const goToCurrentMonth = useCallback(
        () => setMonth(startOfMonth(new Date())),
        []
    )

    return (
        <DateFilterContext.Provider
            value={{
                month,
                from,
                to,
                setMonth,
                previousMonth,
                nextMonth,
                goToCurrentMonth,
            }}
        >
            {children}
        </DateFilterContext.Provider>
    )
}

export const useDateFilter = () => {
    return useContext(DateFilterContext)
}
