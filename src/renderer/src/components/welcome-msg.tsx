import { useUser } from "@clerk/react"

export function WelcomeMsg() {
    const  { user, isLoaded } = useUser()
    
    return (
        <div className="space-y-2 mb-4">
            <h2 className="text-2xl lg:text-4xl text-white font-medium">
                Bem-vindo{isLoaded ? ", " : "! "}{user?.username}👋
            </h2>
            <p className="text-sm lg:text-base text-[#89b6fd]">
                Esse é o Dashboard de Despesas
            </p>
        </div>
    )
}