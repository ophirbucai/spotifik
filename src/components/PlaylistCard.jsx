import PropTypes from 'prop-types'
import { useState } from 'react'

const generateRandomColor = () => Math.floor(Math.random() * 16777215).toString(16)

export const PlaylistCard = ({ _id, songs, name, onPlaylistClick }) => {
    const [backgroundColor] = useState(generateRandomColor())
    const songsCount = songs.length
    return (
        <div className='playlist' style={{ backgroundColor: `#${backgroundColor}` }} onClick={() => onPlaylistClick(_id)}>
            <strong>{name}</strong><br />
            <span>{songsCount === 1 ? `${songsCount} song` : `${songsCount} songs`}</span>
        </div>
    )
}

PlaylistCard.propTypes = {
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    songs: PropTypes.array.isRequired,
    onPlaylistClick: PropTypes.func.isRequired
}
