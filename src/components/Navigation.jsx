import { NavLink } from 'react-router-dom'
import LogoIcon from '../assets/icons/logo.svg?react'
import HomeIcon from '../assets/icons/home.svg?react'
import SearchIcon from '../assets/icons/search.svg?react'

export const Navigation = () => {
    return (
        <div className='navigation-wrapper'>
            <div className='navigation-logo'>
                <a target='_blank' rel='noopener noreferrer' href='/'><LogoIcon className='logo-icon' /><span hidden>Spotifik</span></a>
            </div>
            <ul className='navigation'>

                <li>
                    <NavLink to='/' className='home-icon'><HomeIcon className='home-icon' />Home</NavLink>
                </li>
                <li>
                    <NavLink to='/search'><SearchIcon className='search-icon' />Search</NavLink>
                </li>
            </ul>
        </div>
    )
}
