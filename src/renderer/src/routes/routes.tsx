import { Route, Routes } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "@renderer/pages/dashboard/Home";
import { SignInPage } from "@renderer/pages/auth/SignIn";
import { SignUpPage } from "@renderer/pages/auth/SignUp";
import { NotFoundPage } from "@renderer/pages/auth/NotFound";

export function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
            } />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />

            {/* Catch-all route */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}