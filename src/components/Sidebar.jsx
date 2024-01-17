import { Navigation } from "./Navigation.jsx"
import { Library } from "./Library.jsx"

export const Sidebar = ({ children }) => {
    // TODO: Resize capabilities
    return (
        <nav className="sidebar">
            {children}
        </nav>
    )
}
