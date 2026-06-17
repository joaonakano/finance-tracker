import {
    ActiveDay,
    CategorySummary,
    FinancialData,
    SummaryInput,
    SummaryOutput,
} from "@shared/types"

import { eachDayOfInterval, isSameDay, subDays, differenceInDays } from "date-fns"

import { db } from "../db/db"

export class SummaryRepository {
    static getByDate(data: SummaryInput): SummaryOutput {
        const defaultTo = new Date()
        const defaultFrom = subDays(defaultTo, 30)

        const startDate = data.from ?? defaultFrom.toISOString().slice(0, 10)
        const endDate = data.to ?? defaultTo.toISOString().slice(0, 10)

        const periodLength =
            differenceInDays(new Date(endDate), new Date(startDate)) + 1

        const lastStartDate = subDays(new Date(startDate), periodLength)
            .toISOString()
            .slice(0, 10)
        const lastEndDate = subDays(new Date(endDate), periodLength)
            .toISOString()
            .slice(0, 10)

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

        const activeDays = this.fetchActiveDays(
            data.user_id,
            startDate,
            endDate,
            data.account_id,
        )

        const days = fillMissingDays(
            activeDays,
            new Date(startDate),
            new Date(endDate),
        )

        return {
            currentPeriod,
            lastPeriod,
            incomeChange,
            expensesChange,
            remainingChange,
            categories,
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
                COALESCE(SUM(CASE WHEN t.amount < 0 THEN t.amount ELSE 0 END), 0) AS expenses,
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
            INNER JOIN categories c ON t.category_id = c.id
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

        const topCategories = rows.slice(0, 3)
        const otherCategories = rows.slice(3)

        if (otherCategories.length > 0) {
            const otherSum = otherCategories.reduce(
                (sum, c) => sum + c.value,
                0,
            )

            topCategories.push({ name: "Other", value: otherSum })
        }

        return topCategories
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
): number {
    if (previous === 0) {
        return previous === current ? 0 : 100
    }

    return ((current - previous) / previous) * 100
}

function fillMissingDays(
    activeDays: ActiveDay[],
    startDate: Date,
    endDate: Date,
): ActiveDay[] {
    if (activeDays.length === 0) {
        return []
    }

    const allDays = eachDayOfInterval({
        start: startDate,
        end: endDate,
    })

    const transactionsByDay = allDays.map((day) => {
        const found = activeDays.find((d) => isSameDay(new Date(d.date), day))

        if (found) {
            return found
        } else {
            return {
                date: day.toISOString().slice(0, 10),
                income: 0,
                expenses: 0,
            }
        }
    })

    return transactionsByDay
}
