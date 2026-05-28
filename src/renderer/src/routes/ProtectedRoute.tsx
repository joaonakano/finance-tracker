import { useAuth } from "@clerk/react";
import { Navigate, useNavigate } from "react-router";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isLoaded, isSignedIn } = useAuth()
    const navigate = useNavigate()

    if (!isSignedIn) {
        return <Navigate to="/sign-in" />
    }

    return children
}