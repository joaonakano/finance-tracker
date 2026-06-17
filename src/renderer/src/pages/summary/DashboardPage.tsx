import { DataGrid } from "@renderer/components/data-grid";
import { DashboardLayout } from "@renderer/components/layout";

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <div className="max-x-screen-2xl mx-auto w-full pb-10 -mt-24">
                <DataGrid />
            </div>
        </DashboardLayout>
    )
}