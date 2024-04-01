import { NavLink } from 'react-router-dom'
import HomeIcon from '../assets/icons/home.svg'
import SearchIcon from '../assets/icons/search.svg'

export const Navigation = () => {
    return (
        <div className='navigation-wrapper'>
            <ul className='navigation'>
                <li>
                    <NavLink to='/' className='home-icon'>
                        <HomeIcon className='home-icon' />
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/search'>
                        <SearchIcon className='search-icon' />
                        Search
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
