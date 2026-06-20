import { Link } from "react-router"

export function HeaderLogo() {
    return (
        <Link to="/" className="flex items-center gap-3.5">
            <div className="size-12 bg-linear-to-br from-[#1a2b4a] to-[#2d4a7a] rounded-2xl flex items-center justify-center text-white text-xl font-extrabold shadow-[0_4px_12px_rgba(26,43,74,0.2)]">
                FT
            </div>
            <span className="text-2xl font-bold text-slate-800 tracking-tight">
                Finance <span className="font-light text-slate-500">Tracker</span>
            </span>
        </Link>
    )
}
