import { useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { searchService } from '../services/search.service.js'
import { Playlists } from '../components/Playlists.jsx'

export default function Genre() {
    const location = useLocation()
    const color = location.state?.color
    const { id } = useParams()
    const [genre, setGenre] = useState(null)
    const [playlists, setPlaylists] = useState(null)
    const getPlaylists = async () => {
        const { playlists } = await searchService.getPlaylistsByGenre(id)
        setPlaylists(playlists)
    }
    const getGenre = async () => {
        const genre = searchService.getGenreById(id)
        setGenre(genre)
    }

    useEffect(() => {
        getGenre()
        getPlaylists()

    }, [])

    return (
        <div className='genre' style={color ? { '--bg-base': color.join(' ') } : undefined}>
            <header className='genre__header'>{genre ? <h1>{genre.name}</h1> : 'Loading...'}</header>
            <section className='genre__content'>
                <h2>Discover new music with these playlists</h2>
                {playlists ? <Playlists playlists={playlists} /> : 'Loading...'}
            </section>
        </div>
    )
}

