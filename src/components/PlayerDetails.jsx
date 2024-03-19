import React from 'react'
import { Thumbnail } from './Thumbnail.jsx'
import PropTypes from 'prop-types'

export const PlayerDetails = ({ track }) => {
    return (
        <div className='player-details'>
            <Thumbnail youtubeId={track?.youtubeId} alt={track?.name} />
            <div className='player-details-info'>
                <h3>{track?.name}</h3>
                <p>{track?.artist?.name}</p>
            </div>
        </div>
    )
}

PlayerDetails.propTypes = {
    track: PropTypes.shape({
        youtubeId: PropTypes.string,
        name: PropTypes.string,
        artist: PropTypes.string
    })
}
