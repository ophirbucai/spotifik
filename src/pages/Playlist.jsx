import PlayIcon from '../assets/icons/play.svg'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetEntity } from '../hooks/useGetEntity.jsx'
import { ErrorMessage } from './Track.jsx'
import { TrackCard } from '../components/TrackCard.jsx'
import { Thumbnail } from '../components/Thumbnail.jsx'

export default function Playlist() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { playlist, error, status } = useGetEntity('playlist', id)
    if (error) {
        navigate('/404', { relative: 'path' })
    }
    const count = playlist?.songs?.length
    return (
        <>
            {status === 'loading' && 'Loading track details...'}
            {status === 'error' && <ErrorMessage error={error} />}
            {status === 'success' && (
                <div className='wrapper playlist'>
                    <Thumbnail alt={playlist.name} large />
                    <header className='playlist__details'>
                        <small className='entity'>Playlist</small>
                        <h1 className='name'>{playlist.name}</h1>
                        {playlist.description && <p className='description'>{playlist.description}</p>}
                        <div>
                            {playlist.author && <span className='author'>{playlist.author}</span>}
                            {playlist.songs.length > 0 && <small> • {count} song{count > 1 ? 's' : ''}</small>}
                        </div>
                    </header>
                    <button>
                        <PlayIcon />
                    </button>
                    <div className='playlist__content'>
                        {playlist.songs.map(({ _id }) => {
                            return <TrackCard key={_id} trackId={_id} />
                        })}
                    </div>
                </div>
            )}
        </>
    )
}


