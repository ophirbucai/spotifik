import VolumeOffIcon from '../assets/icons/volume-off.svg?react'
import VolumeLowIcon from '../assets/icons/volume-low.svg?react'
import VolumeMediumIcon from '../assets/icons/volume-medium.svg?react'
import VolumeHighIcon from '../assets/icons/volume-high.svg?react'
import { TrackBar } from './TrackBar.jsx'
import PropTypes from 'prop-types'

import { usePlayer } from '../store/usePlayer'

export const PlayerAside = ({ player}) => {

    // const [currentVolume, setCurrentVolume] = usePlayer(state => state.currVolume)
    const { setCurrentVolume, currentVolume } = usePlayer() //TODO

    function onMute() {
        if (currentVolume === 0) {
            player.unMute()
            setCurrentVolume(player.getVolume())
        } else {
            player.mute()
            setCurrentVolume(0)
        }
    }
    function onVolumeChange(e) {
        setCurrentVolume(e.target.valueAsNumber)
        player.setVolume(e.target.valueAsNumber)
    }


    return (
        <div className='player-aside'>
            <button onClick={onMute} disabled={player === null}>
                {currentVolume === 0 && <VolumeOffIcon />}
                {currentVolume > 0 && currentVolume <= 30 && <VolumeLowIcon />}
                {currentVolume > 30 && currentVolume <= 70 && <VolumeMediumIcon />}
                {currentVolume > 70 && <VolumeHighIcon />}
            </button>
            <div className='volume'>
                <TrackBar value={currentVolume} onChange={onVolumeChange} disabled={player === null} />
            </div>
        </div>
    )
}

PlayerAside.propTypes = {
    player: PropTypes.object,
    // currentVolume: PropTypes.number,
    // onVolumeChange: PropTypes.func,
    // onMute: PropTypes.func
}

//import QueueIcon from '../assets/icons/queue.svg'
// import ConnecttodeviceIcon from '../assets/icons/connecttodevice.svg'
