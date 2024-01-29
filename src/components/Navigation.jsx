import { NavLink } from 'react-router-dom'
import LogoIcon from '../assets/icons/logo.svg?react'
import HomeIcon from '../assets/icons/home.svg?react'
import SearchIcon from '../assets/icons/search.svg?react'

export const Navigation = () => {
    return (
        <ul className='navigation'>
            <li>
                <NavLink to='/'><LogoIcon className='logo-icon' /></NavLink>
            </li>
            <li>
                <NavLink to='/' className='home'><HomeIcon className='home-icon' />Home</NavLink>
            </li>
            <li>
                <NavLink to='/search'><SearchIcon className='search-icon' />Search</NavLink>
            </li>
        </ul>
    )
}
