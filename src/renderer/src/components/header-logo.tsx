import { Link } from "react-router"
import logo from "../../../../resources/logo.svg"

export function HeaderLogo () {
    return (
        <Link to="/">
            <div className="items-center hidden lg:flex">
                <img src={logo} alt="Logo" height={28} width={28} />
                <p className="font-semibold text-white text-2xl ml-2.5">
                    Finance Tracker
                </p>
            </div>
        </Link>
    )
}