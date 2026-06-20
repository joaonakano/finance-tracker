import { DataCharts } from "@renderer/components/data-charts";
import { DataGrid } from "@renderer/components/data-grid";
import { DashboardLayout } from "@renderer/components/layout";

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <div className="pb-10">
                <DataGrid />
                <DataCharts />
            </div>
        </DashboardLayout>
    )
}