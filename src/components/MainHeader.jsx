import GobackIcon from '../assets/icons/goback.svg'
import GoforwardIcon from '../assets/icons/goforward.svg'
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom'
import { lazy, Suspense, useEffect, useState } from 'react'

const Search = lazy(() => import('../components/Search.jsx'))

export const MainHeader = () => {
    const location = useLocation()
    const [historyForward, setHistoryForward] = useState(0)
    const navigate = useNavigate()
    const navType = useNavigationType()

    function navigateBack() {
        setHistoryForward(prev => prev + 1)
        navigate(-1)
    }

    function navigateForward() {
        setHistoryForward(prev => prev - 1)
        navigate(1)
    }

    useEffect(() => {
        if (navType === 'PUSH') {
            setHistoryForward(0)
        }
    }, [navType])

    return (
        <header className='main-header'>
            <div>
                <button onClick={navigateBack} disabled={window.history.state.idx === 0}>
                    {<GobackIcon className='goback-icon' />}
                </button>
                <button onClick={navigateForward} disabled={historyForward <= 0}>
                    {<GoforwardIcon className='goforward-icon' />}
                </button>
            </div>
            {location.pathname.startsWith('/search') && <Suspense><Search /></Suspense>}
        </header>
    )
}


//TODO: Implement profile, notifications, and install app buttons
// import InstallIcon from '../assets/icons/install.svg'
// import ProfileIcon from '../assets/icons/profile.svg'
// import WhatsnewIcon from '../assets/icons/whatsnew.svg'

{/*<div>*/
}
{/*    <button>*/
}
{/*        <InstallIcon className='install-icon' />*/
}
{/*        Install app*/
}
{/*    </button>*/
}
{/*    <button>*/
}
{/*        {' '}*/
}
{/*        <WhatsnewIcon className='whatsnew-icon' />*/
}
{/*    </button>*/
}
{/*    <button>*/
}
{/*        <ProfileIcon className='profile-icon' />*/
}
{/*        Profile*/
}
{/*    </button>*/
}
{/*</div>*/
}
