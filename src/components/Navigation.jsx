import { NavLink } from "react-router-dom"
import HomeActiveIcon from "../assets/icons/home-active.svg?react"
export const Navigation = () => {
    return (
        <ul className="navigation">
            <li>
                <NavLink to="/" className="home"><HomeActiveIcon />Home</NavLink>
            </li>
            <li>
                <NavLink to="/search"> Search</NavLink>
            </li>
        </ul>
    )
}
