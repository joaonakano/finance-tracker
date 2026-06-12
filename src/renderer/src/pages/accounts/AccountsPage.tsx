import { DashboardLayout } from "../dashboard/components/layout";

import { useNewAccount } from "./hooks/use-new-account";

import { Button } from "@renderer/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@renderer/components/ui/card";
import { Plus } from "lucide-react";
import { columns, Payment } from "./components/columns";
import { DataTable } from "@renderer/components/data-table";

const data: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52g",
      amount: 100,
      status: "pending",
      email: "p@example.com",
    },
    {
      id: "728ed52g",
      amount: 100,
      status: "pending",
      email: "a@example.com",
    },
  ]

export default function AccountsPage() {
    const newAccount = useNewAccount()
    
    return (
        <DashboardLayout>
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-10">
                <Card>
                    <CardHeader className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between w-full">
                        <CardTitle className="text-xl font-bold line-clamp-1">
                            Accounts Page
                        </CardTitle>
                        <Button onClick={newAccount.onOpen} size="sm" className="w-full lg:w-auto lg:ml-auto p-4">
                            <Plus className="size-4 mr-2" />
                            Add new
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <DataTable onDelete={() => {}} filterKey="email" columns={columns} data={data} />
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}