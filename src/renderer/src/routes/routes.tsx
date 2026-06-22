import { Route, Routes } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";
import { SignInPage } from "@renderer/pages/auth/SignIn";
import { SignUpPage } from "@renderer/pages/auth/SignUp";
import { NotFoundPage } from "@renderer/pages/auth/NotFound";
import AccountsPage from "@renderer/pages/accounts/AccountsPage";
import CategoriesPage from "@renderer/pages/categories/CategoriesPage";
import TransactionsPage from "@renderer/pages/transactions/TransactionsPage";
import DashboardPage from "@renderer/pages/dashboard/DashboardPage";
import SettingsPage from "@renderer/pages/settings/SettingsPage";
import { AccountFilterProvider } from "@renderer/hooks/use-account-filter";
import { DateFilterProvider } from "@renderer/hooks/use-date-filter";

export function RoutesApp() {
    return (
        <AccountFilterProvider>
        <DateFilterProvider>
        <Routes>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/accounts" element={<AccountsPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/settings/*" element={<SettingsPage />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </DateFilterProvider>
        </AccountFilterProvider>
    )
}