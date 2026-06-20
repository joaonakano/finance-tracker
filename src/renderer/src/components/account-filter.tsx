import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useGetAccounts } from "@renderer/pages/accounts/api/use-get-accounts"
import { useAccountFilter } from "@renderer/hooks/use-account-filter"

export const AccountFilter = () => {
    const { accountId, setAccountId } = useAccountFilter()
    const { accounts, isLoading } = useGetAccounts()

    return (
        <Select
            value={accountId}
            onValueChange={setAccountId}
            disabled={isLoading}
        >
            <SelectTrigger className="lg:w-auto w-full h-9 rounded-lg px-3 font-normal bg-white border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-800 transition">
                <SelectValue placeholder="Conta" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">
                    All accounts
                </SelectItem>
                {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                        {account.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}