import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout.jsx'
import { Search, Home, Track, Playlist, Artist, NotFound, Genre } from './pages'
import { Suspense } from 'react'
import { Browse } from './pages/Browse.jsx'
import { Results } from './pages/Results.jsx'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='/' element={<Suspense />}>
                        <Route index element={<Home />} />
                        <Route path='/search' element={<Search />}>
                            <Route index element={<Browse />} />
                            <Route path='/search/:term' element={<Results />} />
                        </Route>
                        <Route path='/genre/:id' element={<Genre />} />
                        <Route path='/artist/:id' element={<Artist />} />
                        <Route path='/playlist/:id' element={<Playlist />} />
                        <Route path='/track/:id' element={<Track />} />
                    </Route>
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
