import { useEffect, useState } from 'react'
import { searchService } from '../services/search.service.js'
import { Genres } from '../components/Genres.jsx'

export function Browse() {
export default function Browse() {
    const [genres, setGenres] = useState(null)
    useEffect(() => {
        const getGenres = () => {
            const genres = searchService.getGenres()
            setGenres(genres)
        }
        getGenres()
    }, [])

    return (
        <div className='wrapper'>
            {genres ? <Genres genres={genres} /> : 'Loading...'}
        </div>
    )
}


