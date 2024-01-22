import { useNavigate } from "react-router-dom"
import InstallIcon from "../assets/icons/install.svg?react"
import ProfileIcon from "../assets/icons/profile.svg?react"
import WhatsnewIcon from "../assets/icons/whatsnew.svg?react"


export const MainHeader = () => {
    const navigate = useNavigate()
    // console.log(document.referrer.indexOf(window.location.host) !== -1)
    // TODO: Make the header position fixed with a blurred bg when scrolling down and static when scrolling up.
    return (
        <header className="main-header">
            <div>
                <button onClick={() => navigate(-1)}>{'<'}</button>
                {/*<button disabled={} onClick={() => navigate(1)}>{'>'}</button>*/}
            </div>
            <div>
                <button><InstallIcon className="install-icon" />Install app</button>
                <button> <WhatsnewIcon className="whatsnew-icon" /></button>
                <button><ProfileIcon className="profile-icon" />Profile</button>
            </div>
        </header>
    )
}
