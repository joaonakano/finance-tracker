import { NewAccountSheet } from "@renderer/pages/accounts/components/new-account-sheet"
import { EditAccountSheet } from "@renderer/pages/accounts/components/edit-account-sheet"

import { NewCategorySheet } from "@renderer/pages/categories/components/new-category-sheet"
import { EditCategorySheet } from "@renderer/pages/categories/components/edit-category-sheet"

import { NewTransactionSheet } from "@renderer/pages/transactions/components/new-transaction-sheet"
import { EditTransactionSheet } from "@renderer/pages/transactions/components/edit-transaction-sheet"

export const SheetProvider = () => {
    return (
        <>
            <NewTransactionSheet />
            <EditTransactionSheet />
            <NewCategorySheet />
            <EditCategorySheet />
            <NewAccountSheet />
            <EditAccountSheet />
        </>
    )
}
