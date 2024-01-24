import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

export const Sidebar = ({ children }) => {
    // TODO: Resize capabilities
    const [width, setWidth] = useState(200)
    const [isResizing, setIsResizing] = useState(false)

    const ref = useRef(null)
    // const handleResize = (event) => {
    //     setWidth(event.target.value)
    // }
    // const ref = useRef(null)
    // const [isResizing, setIsResizing] = useState(false)
    // const handleMouseDown = (event) => {
    //     setIsResizing(true)
    //     setStartX(event.clientX)
    //     setStartWidth(parseInt(document.defaultView.getComputedStyle(event.target).width, 10))
    // // }
    // const handleMouseUp = () => {
    //     ref?.current.blur()
    // }
    // const handleMouseMove = (event) => {
    //     if (!isResizing) return
    //     const offset = startX - event.clientX
    //     const newWidth = startWidth + offset
    //     setWidth(newWidth)
    // }

    // useEffect(() => {
    //     document.addEventListener('mouseup', handleMouseUp)
    //     return () => {
    //         document.removeEventListener('mouseup', handleMouseUp)
    //     }
    // }, [])


    const handleMouseMove = (event) => {
        if (!isResizing) return
        const maxWidth = 400
        const minWidth = 180
        if (event.clientX > maxWidth || event.clientX < minWidth) return
        setWidth(event.clientX - 42)
    }

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
        <nav className='sidebar' style={style} ref={ref}>
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
