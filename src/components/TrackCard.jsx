import { useGetEntity } from '../hooks/useGetEntity.jsx'
import PropTypes from 'prop-types'
import { useQueue } from '../store/useQueue.js'

export const TrackCard = ({ trackId }) => {
    const { track } = useGetEntity('track', trackId)
    const { addNext } = useQueue()

    return (
        track ? (
            <div className='track'>
                <button className='btn' onClick={() => addNext(trackId)}>Play</button>
                {track.name}
            </div>
        ) : null
    )
}


TrackCard.propTypes = {
    trackId: PropTypes.string.isRequired
}
