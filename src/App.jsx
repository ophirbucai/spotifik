import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout.jsx"
import { Search, Home, Track, Playlist, Artist, NotFound } from './pages'
import { Suspense } from 'react'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Suspense><Home /></Suspense>} />
                    <Route path="/search" element={<Suspense><Search /></Suspense>} />
                    <Route path="/artist/:id" element={<Suspense><Artist /></Suspense>} />
                    <Route path="/playlist/:id" element={<Suspense><Playlist /></Suspense>} />
                    <Route path="/track/:id" element={<Suspense><Track /></Suspense>} />
                </Route>
                <Route path="*" element={<Suspense><NotFound /></Suspense>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
