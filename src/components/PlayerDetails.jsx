import React from 'react'
import { Thumbnail } from './Thumbnail.jsx'
import PropTypes from 'prop-types'

export const PlayerDetails = ({ track }) => {
    return (
        <div className='player-details'>
            <Thumbnail cover={track?.artworkUrl100} alt={track?.trackName} />
            <h3>{track?.trackName}</h3>
            <p>{track?.artistName}</p>
        </div>
    )
}

PlayerDetails.propTypes = {
    track: PropTypes.shape({
        youtubeId: PropTypes.string,
        trackName: PropTypes.string,
        artistName: PropTypes.string,
        artworkUrl100: PropTypes.string
    })
}
