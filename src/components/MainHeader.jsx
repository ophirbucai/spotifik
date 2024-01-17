import { useNavigate } from "react-router-dom"

export const MainHeader = () => {
    const navigate = useNavigate()
    console.log(document.referrer.indexOf(window.location.host) !== -1)
    // TODO: Make the header position fixed with a blurred bg when scrolling down and static when scrolling up.
    return (
        <header className="main-header">
            <div>
                <button onClick={() => navigate(-1)}>{'<'}</button>
                {/*<button disabled={} onClick={() => navigate(1)}>{'>'}</button>*/}
            </div>
            <div>
                <button>Install app</button>
                <button>Bell</button>
                <button>Profile</button>
            </div>
        </header>
    )
}
