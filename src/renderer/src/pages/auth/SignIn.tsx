import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/react";
import { Loader2 } from "lucide-react";
import logo from "../../../../../resources/logo.svg"

export const SignInPage = () => {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="h-full lg:flex flex-col items-center justify-center px-4">
                <div className="text-center space-y-4 pt-16">
                    <h1 className="font-bold text-3xl ">
                        Bem-vindo, novamente!
                    </h1>
                    <p className="text-base text-[#7E8CA0]">
                        Faça o Login ou Registre-se para retornar à dashboard!
                    </p>
                </div>
                <div className="flex items-center justify-center mt-8">
                    <ClerkLoaded>
                        <SignIn signUpUrl="/sign-up"/>
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2 className="animate-spin text-muted-foreground" />
                    </ClerkLoading>
                </div>
            </div>
            <div className="h-full bg-green-600 hidden lg:flex items-center justify-center">
                <img src={logo} height={100} width={100} alt="Logo" />
                
            </div>
        </div>
    );
}