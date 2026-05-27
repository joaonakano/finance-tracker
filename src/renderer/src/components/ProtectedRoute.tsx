import { Show, SignIn } from "@clerk/react";
import { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    return (
        <Show
            when="signed-in"
            fallback={
                <div className="flex h-screen w-screen items-center justify-center bg-slate-950">
                    <SignIn />
                </div>
            }
        >
            {children}
        </Show>
    )
}