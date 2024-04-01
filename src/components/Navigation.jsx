import { NavLink } from 'react-router-dom'
import spotifikLogo from '../assets/icons/logo.png'
import HomeIcon from '../assets/icons/home.svg'
import SearchIcon from '../assets/icons/search.svg'

export const Navigation = () => {
    return (
        <div className='navigation-wrapper'>
            {/*<div className='navigation-logo'>*/}
            {/*    <a target='_blank' rel='noopener noreferrer' href='https://github.com/ophirbucai/spotifik' className='logo'>*/}
            {/*        <img*/}
            {/*            src={spotifikLogo}*/}
            {/*            alt='Spotifik - Great app for music listening'*/}
            {/*            className='logo-icon'*/}
            {/*            height='30px'*/}
            {/*            width='30px'*/}
            {/*        />*/}
            {/*        <span style={{*/}
            {/*            fontFamily: 'Avenir Next',*/}
            {/*            color: 'rgb(255 255 255 / 85%)',*/}
            {/*            fontWeight: 600,*/}
            {/*            letterSpacing: '-0.02em',*/}
            {/*            fontSize: '0.9rem'*/}
            {/*        }}>Spotifik</span>*/}
            {/*    </a>*/}
            {/*</div>*/}
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
