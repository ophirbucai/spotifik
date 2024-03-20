import VolumeOffIcon from '../assets/icons/volume-off.svg'
import VolumeLowIcon from '../assets/icons/volume-low.svg'
import VolumeMediumIcon from '../assets/icons/volume-medium.svg'
import VolumeHighIcon from '../assets/icons/volume-high.svg'
import { TrackBar } from './TrackBar.jsx'
import PropTypes from 'prop-types'
import { usePlayer } from '../store/usePlayer'

export const PlayerAside = ({ player }) => {
    const { setCurrentVolume, currentVolume, isMuted, setIsMuted } = usePlayer()

    function onMuteToggle() {
        setIsMuted(!isMuted)
        if (player !== null) {
            if (isMuted) {
                player.setVolume(currentVolume || 50)
                setCurrentVolume(currentVolume || 50)
            } else {
                player.setVolume(0)
            }
        }
    }

    function onVolumeChange(e) {
        const volume = e.target.valueAsNumber
        setIsMuted(volume === 0)
        setCurrentVolume(volume)
        if (player !== null) {
            player.setVolume(volume)
        }
    }

    return (
        <div className='player-aside'>
            <button onClick={onMuteToggle}>
                {(currentVolume === 0 || isMuted) ? <VolumeOffIcon />
                    : currentVolume <= 30 ? <VolumeLowIcon />
                        : currentVolume <= 70 ? <VolumeMediumIcon />
                            : currentVolume > 70 && <VolumeHighIcon />}
            </button>
            <div className='volume'>
                <TrackBar value={isMuted ? 0 : currentVolume} onChange={onVolumeChange} />
            </div>
        </div>
    )
}

PlayerAside.propTypes = {
    player: PropTypes.object
}

// TODO: Implement queue and connecttodevice buttons
// import QueueIcon from '../assets/icons/queue.svg'
// import ConnecttodeviceIcon from '../assets/icons/connecttodevice.svg'
