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
                    <Route index element={<Suspense><Home /></Suspense>} />
                    <Route path='/search' element={<Suspense><Search /></Suspense>}>
                        <Route index element={<Browse />} />
                        <Route path='/search/:term' element={<Results />} />
                    </Route>
                    <Route path='/genre/:id' element={<Suspense><Genre /></Suspense>} />
                    <Route path='/artist/:id' element={<Suspense><Artist /></Suspense>} />
                    <Route path='/playlist/:id' element={<Suspense><Playlist /></Suspense>} />
                    <Route path='/track/:id' element={<Suspense><Track /></Suspense>} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
