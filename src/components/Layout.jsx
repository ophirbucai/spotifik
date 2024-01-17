import { Navigation } from "./Navigation.jsx"
import { Outlet } from "react-router-dom"
import { MainHeader } from "./MainHeader.jsx"
import { Sidebar } from "./Sidebar.jsx"
import { Library } from "./Library.jsx"
import { NowPlaying } from "./NowPlaying.jsx"

export const Layout = () => {
    return (
        <div className="main-layout">
            <Sidebar>
                <Navigation />
                <Library />
            </Sidebar>
            <main className="content">
                <MainHeader />
                <Outlet />
            </main>
            <footer className="now-playing">
                <NowPlaying />
            </footer>
        </div>
    )
}
