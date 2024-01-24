import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const Genres = ({ genres }) => {
    return (
        <div className='wrapper-content'>
            {genres.map(({ color, name, _id }) => {
                return <Link to={`/genre/${_id}`} key={_id} className='btn-primary' style={{ background: color }}>{name}</Link>
            })}
        </div>
    )
}


Genres.propTypes = {
    genres: PropTypes.arrayOf(PropTypes.shape({
        color: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired
    })).isRequired
}
