import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout.jsx'
import { Home, Track, Playlist, Artist, NotFound, Genre, Results, Browse } from './pages'
import { Suspense } from 'react'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Suspense><Home /></Suspense>} />
                    <Route path='/search' element={<Suspense><Browse /></Suspense>} />
                    <Route path='/search/:term' element={<Suspense><Results /></Suspense>} />
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
