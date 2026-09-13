export type SummaryInput = {
    user_id: string
    month?: string
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
    /** Presente apenas no agregado "Outras": categorias que foram agrupadas nele */
    items?: CategorySummary[]
}

export type ActiveDay = {
    date: string
    income: number
    expenses: number
}

export type SummaryOutput = {
    currentPeriod: FinancialData
    lastPeriod: FinancialData
    /** null quando o período anterior não tem base para comparação (ex: 0 no anterior e algo no atual) */
    incomeChange: number | null
    expensesChange: number | null
    remainingChange: number | null
    categories: CategorySummary[]
    accounts: CategorySummary[]
    days: ActiveDay[]
}