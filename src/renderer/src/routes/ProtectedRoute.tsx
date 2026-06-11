import { useAuth } from "@clerk/react";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
    const { isLoaded, isSignedIn } = useAuth()

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 size={40} className="animate-spin text-muted-foreground " />
            </div>
        )
    }

    if (!isSignedIn) {
        return <Navigate to="/sign-in" />
    }

    return <Outlet />
}