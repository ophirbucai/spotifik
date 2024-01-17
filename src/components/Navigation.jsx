import { NavLink } from "react-router-dom"

export const Navigation = () => {
    return (
        <ul className="navigation">
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/search">Search</NavLink>
            </li>
        </ul>
    )
}
