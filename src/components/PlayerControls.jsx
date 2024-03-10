import PropTypes from 'prop-types'
import SwitchIcon from '../assets/icons/switch.svg'
import PreviousIcon from '../assets/icons/previous.svg'
import PauseIcon from '../assets/icons/pause.svg'
import PlayIcon from '../assets/icons/play.svg'
import NextIcon from '../assets/icons/next.svg'
import RepeatIcon from '../assets/icons/repeat.svg'

export const PlayerControls = ({ player, songStatus }) => {
    function onPlay() {
        player.playVideo()
    }
    function onPause() {
        player.pauseVideo()
    }
    function nextSong() {
        player.nextVideo()
    }
    function previousSong() {
        player.previousVideo()
    }
    return (
        <div className='player-controls-top'>
            <button disabled={player === null}><SwitchIcon className='switch-icon' /></button>
            <button disabled={player === null} onClick={previousSong}><PreviousIcon className='previous-icon' /></button>
            <button disabled={player === null} onClick={songStatus.play ? onPause : onPlay}>
                {songStatus.play ? <PauseIcon className='pause-icon' /> : <PlayIcon className='play-icon' />}
            </button>
            <button disabled={player === null} onClick={nextSong}><NextIcon className='next-icon' /></button>
            <button disabled={player === null}><RepeatIcon className='repeat-icon' /></button>
        </div>
    )
}

PlayerControls.propTypes = {
    player: PropTypes.object,
    songStatus: PropTypes.object
}
