import { Outlet } from 'react-router-dom'
import { MainHeader } from './MainHeader'
import { Sidebar } from './Sidebar'
import { Player } from './Player.jsx'

export const Layout = () => {
    return (
        <div className='main-layout'>
            <Sidebar />
            <main className='content'>
                <MainHeader />
                <Outlet />
            </main>
            <footer className='now-playing'>
                <Player />
            </footer>
        </div>
    )
}
