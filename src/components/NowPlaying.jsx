import SwitchIcon from "../assets/icons/switch.svg?react"
import PreviousIcon from "../assets/icons/previous.svg?react"
import PauseIcon from "../assets/icons/pause.svg?react"
import NextIcon from "../assets/icons/next.svg?react"
import DisablerepeatIcon from "../assets/icons/disablerepeat.svg?react"
import NowplayingviewIcon from "../assets/icons/nowplayingview.svg?react"
import QueueIcon from "../assets/icons/queue.svg?react"
import ConnecttodeviceIcon from "../assets/icons/connecttodevice.svg?react"
import MuteIcon from "../assets/icons/mute.svg?react"


export const NowPlaying = () => {
    return (
        <div className="player">
            <div className="player-details">

            </div>
            <div className="player-controls">

            </div>
            <div className="player-deck">

            </div>

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
