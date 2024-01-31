import SwitchIcon from '../assets/icons/switch.svg'
import PreviousIcon from '../assets/icons/previous.svg'
import PauseIcon from '../assets/icons/pause.svg'
import PlayIcon from '../assets/icons/play.svg'
import NextIcon from '../assets/icons/next.svg'
import DisableRepeatIcon from '../assets/icons/disableRepeat.svg'
import NowplayingviewIcon from '../assets/icons/nowplayingview.svg'
import QueueIcon from '../assets/icons/queue.svg'
import ConnecttodeviceIcon from '../assets/icons/connecttodevice.svg'
import MuteIcon from '../assets/icons/mute.svg'
import TrackIcon from '../assets/icons/track.svg'
import { useGetEntity } from '../hooks/useGetEntity.jsx'
import { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import style from '../assets/styles/modules/youtube.module.scss'

export const NowPlaying = () => {
    const { track, /*error, status*/ } = useGetEntity('track', 'skyfall')
    console.log(track)

    // Function to construct the YouTube URL

    //const constructYouTubeUrl = ``
    const [songStatus, setSongStatus] = useState({ play: false, duration: null })
    const [player, setPlayer] = useState(null)

    const onReady = (e) => {
        setPlayer(e.target)
        const duration = e.target.getDuration()
        setSongStatus({
            ...songStatus, duration
        })
    }
    function playSong() {
        player.playVideo()
        setSongStatus({
            ...songStatus,
            play: true

        })
    }
    function pauseSong() {
        player.pauseVideo()
        setSongStatus({
            ...songStatus,
            play: false
        })
    }
    function onDurationChange(mouseUp = false) {

        return function (event) {
            if (mouseUp)
                player.seekTo(event.target.value, mouseUp)
            //console.log("mouseUp", event.target.value)
        }
    }

    return (
        <div className='player'>
            <div className='player-details'>
                <div className='player-details-cover'>
                    {track?.thumbnail ?
                        <img src={track.thumbnail} alt='song' />
                        : <TrackIcon className='track-icon' />}
                </div>
            </div>
            <div className='player-controls'>
                <div className='player-controls-top'>
                    <button><SwitchIcon className="switch-icon" /></button>
                    <button onClick={player?.previousVideo}><PreviousIcon className="previous-icon" /></button>
                    <button onClick={songStatus.play ? pauseSong : playSong}>
                        {songStatus.play ? <PauseIcon className="pause-icon" /> : <PlayIcon className="play-icon" />}
                    </button>
                    <button onClick={player?.nextVideo}><NextIcon className="next-icon" /></button>
                    <button><DisableRepeatIcon className="disablerepeat-icon" /></button>
                </div>
                <div className='player-controls-bottom'>
                    <input type='range' min={0} max={songStatus.duration || 0} onChange={onDurationChange()} onMouseUp={onDurationChange(true)} />
                </div>
            </div>
            <div className='player-deck'>
                {/* {track && (<iframe allow="autoplay; encrypted-media" width={"20px"} height={"20px"} ref={playerRef}
                    src={`https://www.youtube.com/embed/${track.youtubeId}/?origin=${import.meta.env.BASE_URL}&autoplay=1&enablejsapi=1`}></iframe>)}
            */}
                {track && (<YouTube
                    videoId={track.youtubeId}
                    // id={string}                       // defaults -> ''
                    className={style.youtube}                // defaults -> ''
                    // iframeClassName={string}          // defaults -> ''

                    // title={string}                    // defaults -> ''
                    // loading={string}                  // defaults -> undefined
                    // opts={obj}                        // defaults -> {}
                    onReady={onReady}                    // defaults -> noop
                    onPlay={playSong}                     // defaults -> noop
                    onPause={pauseSong}                    // defaults -> noop
                    // onEnd={func}                      // defaults -> noop
                    // onError={func}                    // defaults -> noop
                    onStateChange={console.log}              // defaults -> noop
                // onPlaybackRateChange={func}       // defaults -> noop
                // onPlaybackQualityChange={func}    // defaults -> noop
                />)}</div>

            {/* 
            <button><NowplayingviewIcon className="nowplayingview-icon" /></button>
            <button><QueueIcon className="queue-icon" /></button>
            <button><ConnecttodeviceIcon className="connecttodevice-icon" /></button>
            <button><MuteIcon className="mute-icon" /></button> */}
        </div>
    )
}


