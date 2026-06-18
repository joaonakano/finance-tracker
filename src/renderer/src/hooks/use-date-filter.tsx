import { createContext, useContext, useState, type ReactNode } from "react"
import { subDays } from "date-fns"

type DateFilterContextValue = {
    from: Date
    to: Date
    setDateRange: (from: Date, to: Date) => void
}

const DateFilterContext = createContext<DateFilterContextValue>({
    from: subDays(new Date(), 30),
    to: new Date(),
    setDateRange: () => {},
})

export const DateFilterProvider = ({ children }: { children: ReactNode }) => {
    const [from, setFrom] = useState<Date>(() => subDays(new Date(), 30))
    const [to, setTo] = useState<Date>(() => new Date())

    const setDateRange = (from: Date, to: Date) => {
        setFrom(from)
        setTo(to)
    }

    return (
        <DateFilterContext.Provider value={{ from, to, setDateRange }}>
            {children}
        </DateFilterContext.Provider>
    )
}

export const useDateFilter = () => {
    return useContext(DateFilterContext)
}
