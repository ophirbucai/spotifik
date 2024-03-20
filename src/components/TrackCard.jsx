import { useGetEntity } from '../hooks/useGetEntity.jsx'
import PropTypes from 'prop-types'
import { useQueue } from '../store/useQueue.js'
import { Thumbnail } from './Thumbnail.jsx'
import PlayIcon from '../assets/icons/play.svg'
import { Link } from 'react-router-dom'

export const TrackCard = ({ trackId, index }) => {
    const { track } = useGetEntity('track', trackId)
    const { add } = useQueue()

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
        return `${minutes}:${formattedSeconds}`
    }

    return (track ? (
        <div className='track'>
            <div className='index'>
                <button className='btn' onClick={() => add(trackId)}><PlayIcon /></button>
                {index}
            </div>
            <div className='info'>
                <div className='thumbnail'>
                    <Thumbnail youtubeId={track.youtubeId} />
                </div>
                <div className='info-song'>
                    <div className='name'>{track.trackName}</div>
                    <Link to={`/artist/${track.artist?._id}`} className='artist'>{track.artist?.name}</Link>
                </div>
            </div>
            {/*<div className='album'> Album</div>*/}
            {/*<div className='date'>{track.dateAt} </div>*/}
            <div className='length'>{formatTime(track.trackLength)}</div>
            {/*<button className='btn' onClick={() => add(trackId)}>Add To Queue</button>*/}
        </div>
    ) : null)

}

TrackCard.propTypes = {
    trackId: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
}
