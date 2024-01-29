import { useCallback, useState } from 'react'
import './useResize.css'

/**
 * A custom hook for resizing the Sidebar
 * @param initialWidth
 * @param offset
 * @returns {[number,(function(): void)|*]}
 */
export const useResize = ({ initialWidth = 200, offset = 75 } = {}) => {
    const [width, setWidth] = useState(initialWidth)

    const handleMouseMove = useCallback((e) => {
        const maxWidth = 400
        const minWidth = 180
        if (e.clientX - offset > maxWidth || e.clientX - offset < minWidth) return
        setWidth(e.clientX - offset)
    }, [])

    const handleMouseUp = useCallback(() => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.documentElement.removeAttribute('data-resizing')

    }, [handleMouseMove])

    const handleMouseDown = useCallback(() => {
        document.documentElement.setAttribute('data-resizing', 'true')
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)

    }, [handleMouseMove, handleMouseUp])


    return [width, handleMouseDown]
}
