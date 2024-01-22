import { useState } from 'react'
import PropTypes from 'prop-types'

export const Sidebar = ({ children }) => {
    // TODO: Resize capabilities
    const [width] = useState(250)

    return (
        <nav className="sidebar" style={{ width }}>
            {children}
        </nav>
    )
}

Sidebar.propTypes = {
    children: PropTypes.node.isRequired
}
