import { PlaylistCard } from './PlaylistCard.jsx'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

export const Playlists = ({ playlists }) => {
    const navigate = useNavigate()
    return (
        <section className='playlists'>
            {playlists.map((playlist) => (
                <PlaylistCard key={playlist._id} {...playlist} onPlaylistClick={(id) => navigate(`/playlist/${id}`)} />
            ))}
        </section>
    )
}

Playlists.propTypes = {
    playlists: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            name: PropTypes.string.isRequired,
            songs: PropTypes.array.isRequired
        })
    ).isRequired
}
