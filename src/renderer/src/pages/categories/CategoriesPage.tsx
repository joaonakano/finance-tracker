import { DashboardLayout } from "@/pages/dashboard/components/layout";

import { Button } from "@renderer/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@renderer/components/ui/card";
import { Plus } from "lucide-react";

export default function CategoriesPage() {

    return (
        <DashboardLayout>
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-10">
                <Card>
                    <CardHeader className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between w-full">
                        <CardTitle className="text-xl font-bold line-clamp-1">
                            Módulo de Categorias
                        </CardTitle>
                        <Button size="sm" className="w-full lg:w-auto lg:ml-auto p-4">
                            <Plus className="size-4 mr-2" />
                            Adicionar novo
                        </Button>
                    </CardHeader>
                    <CardContent>
                       teste
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}