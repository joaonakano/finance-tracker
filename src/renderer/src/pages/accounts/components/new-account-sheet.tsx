import { useNewAccount } from "../hooks/use-new-account";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

export const NewAccountSheet = () => {
    const { isOpen, onClose } = useNewAccount()
    
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        Nova Conta
                    </SheetTitle>
                    <SheetDescription>
                        Crie uma nova conta para rastrear suas transações.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}