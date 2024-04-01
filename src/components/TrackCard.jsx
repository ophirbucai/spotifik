import PropTypes from 'prop-types'
import { useQueue } from '../store/useQueue.js'
import { Thumbnail } from './Thumbnail.jsx'
import PlayIcon from '../assets/icons/play.svg'

export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    return `${minutes}:${formattedSeconds}`
}
export const TrackCard = ({ song, index }) => {
    const { add } = useQueue()


    return (
        <div className='track'>
            {index && (
                <div className='index'>
                    <button className='btn' onClick={() => add(song._id)}><PlayIcon /></button>
                    {index}
                </div>
            )}
            <div className='info'>
                <div className='thumbnail'>
                    <Thumbnail cover={song.artworkUrl100} youtubeId={''} alt={song.trackName} />
                </div>
                <div className='name'>{song.trackName}</div>
                <div className='artist'>{song.artistName}</div>
            </div>
            {/*<div className='album'> Album</div>*/}
            {/*<div className='date'>{track.dateAt} </div>*/}
            <div className='length'>{formatTime(Math.round(song.durationMs / 1000))}</div>
            {/*<button className='btn' onClick={() => add(trackId)}>Add To Queue</button>*/}
        </div>
    )
}

TrackCard.propTypes = {
    song: PropTypes.object.isRequired,
    index: PropTypes.number
}
