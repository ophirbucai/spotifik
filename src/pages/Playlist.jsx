import { useParams } from 'react-router-dom'
import { useGetEntity } from '../hooks/useGetEntity.jsx'
import { ErrorMessage } from './Track.jsx'
import { TrackCard } from '../components/TrackCard.jsx'

export default function Playlist() {
    const { id } = useParams()
    const { playlist, error, status } = useGetEntity('playlist', id)

    return (
        <>
            {status === 'loading' && 'Loading track details...'}
            {status === 'error' && <ErrorMessage error={error} />}
            {status === 'success' && (
                <div className='wrapper'>
                    {playlist.songs.map(trackId => {
                        return <TrackCard key={trackId} trackId={trackId} />
                    })}
                </div>
            )}
        </>
    )
}


