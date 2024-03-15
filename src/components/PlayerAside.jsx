import VolumeOffIcon from '../assets/icons/volume-off.svg'
import VolumeLowIcon from '../assets/icons/volume-low.svg'
import VolumeMediumIcon from '../assets/icons/volume-medium.svg'
import VolumeHighIcon from '../assets/icons/volume-high.svg'
import { useState } from 'react'
import { TrackBar } from './TrackBar.jsx'
import PropTypes from 'prop-types'

export const PlayerAside = ({ player }) => {
    const [currentVolume, setCurrentVolume] = useState(100)
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
    player: PropTypes.object
}

//import QueueIcon from '../assets/icons/queue.svg'
// import ConnecttodeviceIcon from '../assets/icons/connecttodevice.svg'
