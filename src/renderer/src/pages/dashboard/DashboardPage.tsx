import { DataCharts } from "@renderer/components/data-charts";
import { DataGrid } from "@renderer/components/data-grid";
import { DashboardLayout } from "@renderer/components/layout";
import { AccountFilter } from "@renderer/components/account-filter";
import { ExpenseBreakdown } from "@renderer/components/expense-breakdown";
import { TopExpensesList } from "@renderer/components/top-expenses-list";

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <div className="pb-10 space-y-8">
                <div className="flex items-center gap-2 flex-wrap">
                    <AccountFilter />
                </div>
                <DataGrid />
                <DataCharts />
                <ExpenseBreakdown />
                <TopExpensesList />
            </div>
        </DashboardLayout>
    )
}
