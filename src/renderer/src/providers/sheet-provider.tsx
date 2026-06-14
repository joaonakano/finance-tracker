import { NewAccountSheet } from "@renderer/pages/accounts/components/new-account-sheet"
import { EditAccountSheet } from "@renderer/pages/accounts/components/edit-account-sheet"

import { NewCategorySheet } from "@renderer/pages/categories/components/new-category-sheet"
import { EditCategorySheet } from "@renderer/pages/categories/components/edit-category-sheet"

export const SheetProvider = () => {
    return (
        <>
            <NewCategorySheet />
            <EditCategorySheet />
            <NewAccountSheet />
            <EditAccountSheet />
        </>
    )
}
