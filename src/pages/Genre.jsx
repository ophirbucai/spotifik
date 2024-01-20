import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { searchService } from '../services/search.service.js'
import { Playlists } from '../components/Playlists.jsx'

export default function Genre() {
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
        <div className='genre wrapper'>
            <div className='wrapper-content'>
                {genre ? <h1>{genre.name}</h1> : 'Loading...'}
                {playlists ? (
                    playlists.length ? (
                        <Playlists playlists={playlists} />
                    ) : (
                        'No results'
                    )
                ) : (
                    'Loading...'
                )}
            </div>
        </div>
    )
}

