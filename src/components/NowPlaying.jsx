// import SwitchIcon from '../assets/icons/switch.svg'
// import PreviousIcon from '../assets/icons/previous.svg'
// import PauseIcon from '../assets/icons/pause.svg'
// import NextIcon from '../assets/icons/next.svg'
// import DisablerepeatIcon from '../assets/icons/disablerepeat.svg'
// import NowplayingviewIcon from '../assets/icons/nowplayingview.svg'
// import QueueIcon from '../assets/icons/queue.svg'
// import ConnecttodeviceIcon from '../assets/icons/connecttodevice.svg'
// import MuteIcon from '../assets/icons/mute.svg'
import TrackIcon from '../assets/icons/track.svg'
import { useGetEntity } from '../hooks/useGetEntity.jsx'

export const NowPlaying = () => {
    const { track, /*error, status*/ } = useGetEntity('track', 'skyfall')
    console.log(track)

    return (
        <div className='player'>
            <div className='player-details'>
                <div className='player-details-cover'>
                    {track?.thumbnail ?
                        <img src={track.thumbnail} alt='song' />
                        : <TrackIcon className='track-icon' />}
                </div>
            </div>
            <div className='player-controls'></div>
            <div className='player-deck'></div>

            {/* <button><SwitchIcon className="switch-icon" /></button>
            <button><PreviousIcon className="previous-icon" /></button>
            <button><PauseIcon className="pause-icon" /></button>
            <button><NextIcon className="next-icon" /></button>
            <button><DisablerepeatIcon className="disablerepeat-icon" /></button>
            <button><NowplayingviewIcon className="nowplayingview-icon" /></button>
            <button><QueueIcon className="queue-icon" /></button>
            <button><ConnecttodeviceIcon className="connecttodevice-icon" /></button>
            <button><MuteIcon className="mute-icon" /></button> */}
        </div>
    )
}
