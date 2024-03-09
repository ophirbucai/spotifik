import { useGetEntity } from '../hooks/useGetEntity.jsx'
import PropTypes from 'prop-types'

export const TrackCard = ({ trackId }) => {
    const { track } = useGetEntity('track', trackId)

    return (
        track ? (
            <div className='track'>
                <button className='btn'>Play</button>
                {track.name}
            </div>
        ) : null
    )
}


TrackCard.propTypes = {
    trackId: PropTypes.string.isRequired
}
