import ClockIcon from '../assets/icons/clock.svg'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetEntity } from '../hooks/useGetEntity'
import { ErrorMessage } from './Track.jsx'
import { TrackCard } from '../components/TrackCard.jsx'
import { Thumbnail } from '../components/Thumbnail.jsx'
import { useQueue } from '../store/useQueue.js'
import { useColorPicker } from '../hooks/useColorPicker.js'
import { PlayButton } from '../components/PlayButton.jsx'

export default function Playlist() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { playlist, error, status } = useGetEntity('playlist', id)
    const { color, onImageLoad } = useColorPicker(playlist?.songs[0]?.youtubeId)
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
                <div key={id} className='playlist' style={color ? { '--bg-base': color } : undefined}>
                    <div className='playlist__header bg'>
                        <Thumbnail onImageLoad={onImageLoad} youtubeId={playlist?.songs[0]?.youtubeId} alt={playlist.name} large />
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
                    <section className='playlist__content'>
                        <div className='playlist__panel'>
                            <PlayButton onClick={() => add(...playlist.songs.map(({ _id }) => _id))} />
                        </div>
                        <div className='playlist__table'>
                            <div className='playlist__table__header'>
                                <div className='one'>#</div>
                                <div className='two'>Title</div>
                                {/*<div className='three'>Album</div>*/}
                                {/*<div className='four'>Date added</div>*/}
                                <div className='five'><ClockIcon /></div>
                            </div>
                            <div className='divider'></div>
                            <div className='playlist__table__content'>
                                {playlist.songs.map((song, index) => {
                                    return <TrackCard key={song._id} song={song} index={index + 1} />
                                })}
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </>
    )
}


