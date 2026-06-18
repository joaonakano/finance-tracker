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
            <SelectTrigger className="lg:w-auto w-full h-9 rounded-sm px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition data-placeholder:text-white [&_svg]:text-white">
                <SelectValue placeholder="Account" />
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