import { useCallback, useState } from 'react'
import './useResize.css'

/**
 * @param initialWidth {number}
 * @returns {[number,function(): void]}
 */
export const useResize = (initialWidth = 200) => {
    const [width, setWidth] = useState(initialWidth)

    const handleMouseMove = useCallback((e) => {
        const offset = 42
        const maxWidth = 400
        const minWidth = 180
        if (e.clientX - offset > maxWidth || e.clientX - offset < minWidth) return
        setWidth(e.clientX - offset)
    }, [])

    const handleMouseUp = useCallback(() => {
        document.documentElement.removeAttribute('data-resizing')
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)

    }, [handleMouseMove])

    const handleMouseDown = useCallback(() => {
        document.documentElement.setAttribute('data-resizing', 'true')
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)

    }, [handleMouseMove, handleMouseUp])


    return [width, handleMouseDown]
}
