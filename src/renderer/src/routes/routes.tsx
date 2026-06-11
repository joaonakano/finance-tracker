import { Route, Routes } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "@renderer/pages/dashboard/Home";
import { SignInPage } from "@renderer/pages/auth/SignIn";
import { SignUpPage } from "@renderer/pages/auth/SignUp";
import { NotFoundPage } from "@renderer/pages/auth/NotFound";
import AccountsPage from "@renderer/pages/accounts/AccountsPage";

export function RoutesApp() {
    return (
        <Routes>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/accounts" element={<AccountsPage />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}