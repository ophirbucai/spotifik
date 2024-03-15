import { useResize } from '../hooks/useResize'
import { Navigation } from './Navigation.jsx'
import { Library } from './Library.jsx'
import { useEffect } from 'react'

export const Sidebar = () => {
    const [width, handleMouseDown] = useResize()
    
    useEffect(() => {
        document.documentElement.style.setProperty('--sidebar-width', `${width}px`)

    }, [width])

    return (
        <nav className='sidebar'>
            <Navigation />
            <Library />
            <button className={'resize-handle'} onMouseDown={handleMouseDown}></button>
        </nav>
    )
}
