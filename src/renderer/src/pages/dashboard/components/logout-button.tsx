import { useClerk } from "@clerk/react";
import { LogOut } from "lucide-react";

export function LogoutButton() {
    const { signOut } = useClerk()

    const handleLogout = async () => {
        await signOut()
    }

    return (
        <button onClick={handleLogout}>
            <LogOut />
            Sair
        </button>
    )
}