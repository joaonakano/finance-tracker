import { NewAccountSheet } from "@renderer/pages/accounts/components/new-account-sheet"
import { EditAccountSheet } from "@renderer/pages/accounts/components/edit-account-sheet"

export const SheetProvider = () => {
    return (
        <>
            <NewAccountSheet />
            <EditAccountSheet />
        </>
    )
}
