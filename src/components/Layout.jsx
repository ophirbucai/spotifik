import { Navigation } from './Navigation'
import { Outlet } from 'react-router-dom'
import { MainHeader } from './MainHeader'
import { Sidebar } from './Sidebar'
import { Library } from './Library'
import { NowPlaying } from './NowPlaying'

export const Layout = () => {
    return (
        <div className='main-layout'>
            <Sidebar>
                <Navigation />
                <Library />
            </Sidebar>
            <main className='content'>
                <MainHeader />
                <Outlet />
            </main>
            <footer className='now-playing'>
                <NowPlaying />
            </footer>
        </div>
    )
}
