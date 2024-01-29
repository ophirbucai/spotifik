import PropTypes from 'prop-types'
import { useResize } from '../hooks/useResize'

export const Sidebar = ({ children }) => {
    const [width, handleMouseDown] = useResize()

    const style = { '--sidebar-width': `${width}px` }

    return (
        <nav className='sidebar' style={style}>
            {children}
            <label
                htmlFor='resize'
                className={'resize-handle'}
                onMouseDown={handleMouseDown}
            >
            </label>
        </nav>
    )
}

Sidebar.propTypes = {
    children: PropTypes.node.isRequired
}
