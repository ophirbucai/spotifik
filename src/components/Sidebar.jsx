import { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

export const Sidebar = ({ children }) => {
    const [width, setWidth] = useState(200)
    const [isResizing, setIsResizing] = useState(false)

    const handleMouseMove = useCallback((event) => {
        if (!isResizing) return
        const offset = 42
        const maxWidth = 400
        const minWidth = 180
        if (event.clientX - offset > maxWidth || event.clientX - offset < minWidth) return
        setWidth(() => event.clientX - offset)
    }, [])

    useEffect(() => {
        if (!isResizing) return

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', () => setIsResizing(false))

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
        }
    }, [isResizing])


    const style = { '--sidebar-width': `${width}px` }

    return (
        <nav className='sidebar' style={style}>
            {children}
            <label
                htmlFor='resize'
                className={'resize-handle'}
                onMouseDown={() => setIsResizing(true)}
            >
            </label>
        </nav>
    )
}

Sidebar.propTypes = {
    children: PropTypes.node.isRequired
}
