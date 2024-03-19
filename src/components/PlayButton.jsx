import PlayIcon from '../assets/icons/play.svg'
import PropTypes from 'prop-types'

export const PlayButton = ({ onClick }) => {
    return (
        <button className='play-button' onClick={onClick}>
            <PlayIcon />
        </button>
    )
}

PlayButton.propTypes = {
    onClick: PropTypes.func.isRequired
}