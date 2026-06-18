import { createContext, useContext, useState, type ReactNode } from "react"

type AccountFilterContextValue = {
    accountId: string
    setAccountId: (id: string) => void
}

const AccountFilterContext = createContext<AccountFilterContextValue>({
    accountId: "all",
    setAccountId: () => {},
})

export const AccountFilterProvider = ({ children }: { children: ReactNode }) => {
    const [accountId, setAccountId] = useState("all")

    return (
        <AccountFilterContext.Provider value={{ accountId, setAccountId }}>
            {children}
        </AccountFilterContext.Provider>
    )
}

export const useAccountFilter = () => {
    return useContext(AccountFilterContext)
}
