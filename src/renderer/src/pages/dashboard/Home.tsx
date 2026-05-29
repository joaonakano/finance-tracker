import { UserButton } from "@clerk/react";
import { DashboardLayout } from "./components/layout";

export default function Home() {
    return (
        <>
            <DashboardLayout>
                <UserButton />
            </DashboardLayout>
        </>
    )
}