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
        <>
            <SwitchIcon className="switch-icon" />
            <PreviousIcon className="previous-icon" />
            <PauseIcon className="pause-icon" />
            <NextIcon className="next-icon" />
            <DisablerepeatIcon className="disablerepeat-icon" />
            <NowplayingviewIcon className="nowplayingview-icon" />
            <QueueIcon className="queue-icon" />
            <ConnecttodeviceIcon className="connecttodevice-icon" />
            <MuteIcon className="mute-icon" />

            Now playing
        </>
    )
}
