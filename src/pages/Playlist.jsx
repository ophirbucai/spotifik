import PlayIcon from '../assets/icons/play.svg'
import ClockIcon from '../assets/icons/clock.svg'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetEntity } from '../hooks/useGetEntity.jsx'
import { ErrorMessage } from './Track.jsx'
import { TrackCard } from '../components/TrackCard.jsx'
import { Thumbnail } from '../components/Thumbnail.jsx'
import { useQueue } from '../store/useQueue.js'

export default function Playlist() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { playlist, error, status } = useGetEntity('playlist', id)
    const { add } = useQueue()
    if (error) {
        navigate('/404', { relative: 'path' })
    }
    const count = playlist?.songs?.length
    return (
        <>
            {status === 'loading' && 'Loading track details...'}
            {status === 'error' && <ErrorMessage error={error} />}
            {status === 'success' && (
                <div className='playlist'>
                    <div className='playlist__header bg'>
                        <Thumbnail youtubeId={playlist?.songs[0]?.youtubeId} alt={playlist.name} large />
                        <header className='details'>
                            <small className='entity'>Playlist</small>
                            <h1 className='name'>{playlist.name}</h1>
                            {playlist.description && <p className='description'>{playlist.description}</p>}
                            <div>
                                {playlist.author && <span className='author'>{playlist.author}</span>}
                                {playlist.songs.length > 0 && <small> • {count} song{count > 1 ? 's' : ''}</small>}
                            </div>
                        </header>
                    </div>

                    <div className='playlist__panel'>
                        <button className='btn-play' onClick={() => add(...playlist.songs.map(({ _id }) => _id))}>
                            <PlayIcon />
                        </button>
                    </div>



                    <div className='playlist__table'>
                        <div className='playlist__table col'>
                            <div className='one'>#</div>
                            <div className='two'>Title</div>
                            <div className='three'>Album</div>
                            <div className='four'>Date added</div>
                            <div className='five'><ClockIcon /></div>
                        </div>
                        <div className='divider'></div>
                        <div className='playlist__table content'>
                            {playlist.songs.map(({ _id }, index) => {
                                return <TrackCard key={_id} trackId={_id} index={index + 1} />
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


