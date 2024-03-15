import { useGetEntity } from '../hooks/useGetEntity.jsx'
import PropTypes from 'prop-types'
import { useQueue } from '../store/useQueue.js'
import { Thumbnail } from './Thumbnail.jsx'

export const TrackCard = ({ trackId, index }) => {
    const { track } = useGetEntity('track', trackId)
    const { addNext, add } = useQueue()

    const formattedTrackLength = formatTime(track?.trackLength)

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
        return `${minutes}:${formattedSeconds}`
    }
    
    return (
        track ? (
            <div className='track'>
                <div className='index'> {index}</div>

                <div className='info'>
                    <div className='thumbnail'> <Thumbnail youtubeId={track.youtubeId} /></div>
                    {/* <button className='btn' onClick={() => addNext(trackId)}>Play</button> */}
                    <div className='info-song'>
                        <div className='name'>{track.name}</div>
                        <div className='artist'>{track.artist}</div>
                    </div>
                </div>
                <div className='album'> Album </div>
                <div className='date'> Date </div>
                <div className='length'>{formatTime(track.trackLength)} </div>
                {/* <button className='btn' onClick={() => add(trackId)}>Add To Queue</button> */}
            </div>
        ) : null
    )

}

TrackCard.propTypes = {
    trackId: PropTypes.string.isRequired
}
