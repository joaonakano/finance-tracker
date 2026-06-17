export type SummaryInput = {
    user_id: string
    from?: string
    to?: string
    account_id?: string
}

export type FinancialData = {
    income: number
    expenses: number
    remaining: number
}

export type CategorySummary = {
    name: string
    value: number
}

export type ActiveDay = {
    date: string
    income: number
    expenses: number
}

export type SummaryOutput = {
    currentPeriod: FinancialData
    lastPeriod: FinancialData
    incomeChange: number
    expensesChange: number
    remainingChange: number
    categories: CategorySummary[]
    days: ActiveDay[]
}