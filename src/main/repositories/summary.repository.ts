import {
    ActiveDay,
    CategorySummary,
    FinancialData,
    SummaryInput,
    SummaryOutput,
} from "@shared/types"

import {
    eachDayOfInterval,
    endOfMonth,
    format,
    isSameDay,
    parse,
    startOfMonth,
    subMonths,
} from "date-fns"

import { db } from "../db/db"

export class SummaryRepository {
    static getByMonth(data: SummaryInput): SummaryOutput {
        const now = new Date()
        const monthKey = data.month ?? format(now, "yyyy-MM")

        const [year, month] = monthKey.split("-").map(Number)
        const currentMonth = new Date(year, month - 1, 1)

        const startDate = format(startOfMonth(currentMonth), "yyyy-MM-dd")
        const endDate = format(endOfMonth(currentMonth), "yyyy-MM-dd")

        const previousMonth = subMonths(currentMonth, 1)
        const lastStartDate = format(startOfMonth(previousMonth), "yyyy-MM-dd")
        const lastEndDate = format(endOfMonth(previousMonth), "yyyy-MM-dd")

        const currentPeriod = this.fetchFinancialData(
            data.user_id,
            startDate,
            endDate,
            data.account_id,
        )

        const lastPeriod = this.fetchFinancialData(
            data.user_id,
            lastStartDate,
            lastEndDate,
            data.account_id,
        )

        const incomeChange = calculatePercentageChange(
            currentPeriod.income,
            lastPeriod.income,
        )
        const expensesChange = calculatePercentageChange(
            currentPeriod.expenses,
            lastPeriod.expenses,
        )
        const remainingChange = calculatePercentageChange(
            currentPeriod.remaining,
            lastPeriod.remaining,
        )

        const categories = this.fetchCategorySummary(
            data.user_id,
            startDate,
            endDate,
            data.account_id,
        )

        const accounts = this.fetchAccountSummary(
            data.user_id,
            startDate,
            endDate,
            data.account_id,
        )

        const activeDays = this.fetchActiveDays(
            data.user_id,
            startDate,
            endDate,
            data.account_id,
        )

        const days = fillMissingDays(
            activeDays,
            parse(startDate, "yyyy-MM-dd", new Date()),
            parse(endDate, "yyyy-MM-dd", new Date()),
        )

        return {
            currentPeriod,
            lastPeriod,
            incomeChange,
            expensesChange,
            remainingChange,
            categories,
            accounts,
            days,
        }
    }

    private static fetchFinancialData(
        userId: string,
        startDate: string,
        endDate: string,
        accountId?: string,
    ): FinancialData {
        const result = db
            .prepare(
                `
            SELECT
                COALESCE(SUM(CASE WHEN t.amount >= 0 THEN t.amount ELSE 0 END), 0) AS income,
                COALESCE(SUM(CASE WHEN t.amount < 0 THEN ABS(t.amount) ELSE 0 END), 0) AS expenses,
                COALESCE(SUM(t.amount), 0) AS remaining
            FROM transactions t
            INNER JOIN accounts a ON t.account_id = a.id
            WHERE a.user_id = ?
              AND t.date >= ?
              AND t.date <= ?
              ${accountId ? "AND t.account_id = ?" : ""}
        `,
            )
            .get(userId, startDate, endDate, ...(accountId ? [accountId] : [])) as {
                income: number
                expenses: number
                remaining: number
            }

        return result
    }

    private static fetchCategorySummary(
        userId: string,
        startDate: string,
        endDate: string,
        accountId?: string,
    ): CategorySummary[] {
        const rows = db
            .prepare(
                `
            SELECT
                c.name,
                SUM(ABS(t.amount)) AS value
            FROM transactions t
            INNER JOIN accounts a ON t.account_id = a.id
            INNER JOIN categories c
                ON t.category_id = c.id
               AND c.user_id = a.user_id
            WHERE a.user_id = ?
              AND t.amount < 0
              AND t.date >= ?
              AND t.date <= ?
              ${accountId ? "AND t.account_id = ?" : ""}
            GROUP BY c.name
            ORDER BY value DESC
        `,
            )
            .all(
                userId,
                startDate,
                endDate,
                ...(accountId ? [accountId] : []),
            ) as { name: string; value: number }[]

        return this.groupTopWithOthers(rows)
    }

    private static fetchAccountSummary(
        userId: string,
        startDate: string,
        endDate: string,
        accountId?: string,
    ): CategorySummary[] {
        const rows = db
            .prepare(
                `
            SELECT
                a.name,
                SUM(ABS(t.amount)) AS value
            FROM transactions t
            INNER JOIN accounts a ON t.account_id = a.id
            WHERE a.user_id = ?
              AND t.amount < 0
              AND t.date >= ?
              AND t.date <= ?
              ${accountId ? "AND t.account_id = ?" : ""}
            GROUP BY a.name
            ORDER BY value DESC
        `,
            )
            .all(
                userId,
                startDate,
                endDate,
                ...(accountId ? [accountId] : []),
            ) as { name: string; value: number }[]

        return this.groupTopWithOthers(rows)
    }

    private static groupTopWithOthers(
        rows: { name: string; value: number }[],
        topCount = 5,
    ): CategorySummary[] {
        const topItems: CategorySummary[] = rows.slice(0, topCount)
        const otherItems = rows.slice(topCount)

        if (otherItems.length > 0) {
            const otherSum = otherItems.reduce(
                (sum, item) => sum + item.value,
                0,
            )

            topItems.push({
                name: "Outras",
                value: otherSum,
                items: otherItems,
            })
        }

        return topItems
    }

    private static fetchActiveDays(
        userId: string,
        startDate: string,
        endDate: string,
        accountId?: string,
    ): ActiveDay[] {
        return db
            .prepare(
                `
            SELECT
                t.date,
                COALESCE(SUM(CASE WHEN t.amount >= 0 THEN t.amount ELSE 0 END), 0) AS income,
                COALESCE(SUM(CASE WHEN t.amount < 0 THEN ABS(t.amount) ELSE 0 END), 0) AS expenses
            FROM transactions t
            INNER JOIN accounts a ON t.account_id = a.id
            WHERE a.user_id = ?
              AND t.date >= ?
              AND t.date <= ?
              ${accountId ? "AND t.account_id = ?" : ""}
            GROUP BY t.date
            ORDER BY t.date
        `,
            )
            .all(
                userId,
                startDate,
                endDate,
                ...(accountId ? [accountId] : []),
            ) as ActiveDay[]
    }
}

function calculatePercentageChange(
    current: number,
    previous: number,
): number | null {
    if (previous === 0) {
        // Sem base no período anterior: se o atual também for 0, é estagnação
        // real (0%). Se o atual tiver valor, não há uma variação percentual
        // significativa a reportar (não é "aumento de X%", é ausência de comparação).
        return current === 0 ? 0 : null
    }

    return ((current - previous) / Math.abs(previous)) * 100
}

function fillMissingDays(
    activeDays: ActiveDay[],
    startDate: Date,
    endDate: Date,
): ActiveDay[] {
    const allDays = eachDayOfInterval({
        start: startDate,
        end: endDate,
    })

    return allDays.map((day) => {
        const found = activeDays.find((d) => isSameDay(parse(d.date, "yyyy-MM-dd", new Date()), day))

        if (found) {
            return found
        } else {
            return {
                date: format(day, "yyyy-MM-dd"),
                income: 0,
                expenses: 0,
            }
        }
    })
}
