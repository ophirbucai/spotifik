import PropTypes from 'prop-types'
import SwitchIcon from '../assets/icons/switch.svg'
import PreviousIcon from '../assets/icons/previous.svg'
import PauseIcon from '../assets/icons/pause.svg'
import PlayIcon from '../assets/icons/play.svg'
import NextIcon from '../assets/icons/next.svg'
import RepeatIcon from '../assets/icons/repeat.svg'
import { useQueue } from '../store/useQueue'


export const PlayerControls = ({ player, songStatus }) => {
    const { remove, prev, queue, pastQueue} = useQueue()
    function onPlay() {
        player.playVideo()
    }
    function onPause() {
        player.pauseVideo()
    }
    function nextSong() {
        remove()
    }
    function previousSong() {
        prev()
    }
    return (
        <div className='player-controls-top'>
            <button disabled={player === null}><SwitchIcon className='switch-icon' /></button>
            <button disabled={player === null && pastQueue.length === 0} onClick={previousSong}><PreviousIcon className='previous-icon' /></button>
            <button disabled={player === null} onClick={songStatus.play ? onPause : onPlay}>
                {songStatus.play ? <PauseIcon className='pause-icon' /> : <PlayIcon className='play-icon' />}
            </button>
            <button disabled={player === null && queue.length <= 1} onClick={nextSong}><NextIcon className='next-icon' /></button>
            <button disabled={player === null}><RepeatIcon className='repeat-icon' /></button>
        </div>
    )
}

PlayerControls.propTypes = {
    player: PropTypes.object,
    songStatus: PropTypes.object
}
