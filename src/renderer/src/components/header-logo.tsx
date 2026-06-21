import { Link } from "react-router"
import logo from "../../../../resources/logo.svg"

export function HeaderLogo() {
    return (
        <Link to="/" className="flex items-center gap-3.5">
            <img src={logo} alt="Logo" className="size-10 brightness-1" />
            <span className="text-2xl font-bold text-slate-800 tracking-tight">
                Finance <span className="font-light text-slate-500">Tracker</span>
            </span>
        </Link>
    )
}
