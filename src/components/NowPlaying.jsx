import SwitchIcon from '../assets/icons/switch.svg'
import PreviousIcon from '../assets/icons/previous.svg'
import PauseIcon from '../assets/icons/pause.svg'
import PlayIcon from '../assets/icons/play.svg'
import NextIcon from '../assets/icons/next.svg'
import DisableRepeatIcon from '../assets/icons/disableRepeat.svg'
//import NowplayingviewIcon from '../assets/icons/nowplayingview.svg'
//import QueueIcon from '../assets/icons/queue.svg'
// import ConnecttodeviceIcon from '../assets/icons/connecttodevice.svg'
// import MuteIcon from '../assets/icons/mute.svg'
import { useGetEntity } from '../hooks/useGetEntity.jsx'
import { useCallback, useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import style from '../assets/styles/modules/youtube.module.scss'
import { Thumbnail } from './Thumbnail.jsx'

export const NowPlaying = () => {
    const { track /*error, status*/ } = useGetEntity('track', 'skyfall')
    const [progress, setProgress] = useState(null)
    const [songStatus, setSongStatus] = useState({ play: false, duration: null, currentTime: 0 })
    const [player, setPlayer] = useState(null)

    useEffect(() => {
        const interval = setInterval(() => {
            if (player && songStatus.play) {
                const currentTime = player.getCurrentTime()
                setSongStatus(prevStatus => ({ ...prevStatus, currentTime }))
            }
        }, 100)

        return () => clearInterval(interval)
    }, [player, songStatus.play])

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
    const onDurationChange = useCallback(() => {
        setTimeout(setProgress, 150, null)
        player.seekTo(progress, true)
    }, [progress, player])

    function formatTime(time) {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${String(minutes).padStart(1, '0')}:${String(seconds).padStart(2, '0')}`
    }

    useEffect(() => {
        if (progress !== null) {
            window.addEventListener('mouseup', onDurationChange)
        }
        return () => window.removeEventListener('mouseup', onDurationChange)
    }, [onDurationChange, progress])

    const progressBarStyle = { width: `${(Math.max(1, progress || songStatus.currentTime) / songStatus.duration * 100)}%` }
    return (
        <div className='player'>
            <div className='player-details'>
                <Thumbnail youtubeId={track?.youtubeId} alt={track?.name} />
                <div className='player-details-info'>
                    <h3>{track?.name}</h3>
                    <p>{track?.artist}</p>
                </div>
            </div>
            <div className='player-controls'>
                <div className='player-controls-top'>
                    <button><SwitchIcon className='switch-icon' /></button>
                    <button onClick={player?.previousVideo}><PreviousIcon className='previous-icon' /></button>
                    <button onClick={songStatus.play ? pauseSong : playSong}>
                        {songStatus.play ? <PauseIcon className='pause-icon' /> : <PlayIcon className='play-icon' />}
                    </button>
                    <button onClick={player?.nextVideo}><NextIcon className='next-icon' /></button>
                    <button><DisableRepeatIcon className='disablerepeat-icon' /></button>
                </div>
                <div className='player-controls-bottom'>
                    <div className='progress-time-now'>{formatTime(songStatus.currentTime)}</div>
                    <div className='progress-bar'>
                        <div className='progress-bar-fill' style={progressBarStyle}></div>
                        <input
                            type='range'
                            min={0}
                            max={songStatus.duration || 0}
                            value={(progress || songStatus.currentTime) || 0}
                            onChange={(event) => setProgress(event.target.value)}
                        />
                    </div>
                    <div className='progress-time-end'>{formatTime(songStatus.duration)}</div>
                </div>
            </div>
            <div className='player-deck'>
                {/* {track && (<iframe allow="autoplay; encrypted-media" width={"20px"} height={"20px"} ref={playerRef}
                    src={`https://www.youtube.com/embed/${track.youtubeId}/?origin=${import.meta.env.BASE_URL}&autoplay=1&enablejsapi=1`}></iframe>)}
            */}
                {track && (<YouTube
                    videoId={track.youtubeId}
                    // id={string}                       // defaults -> ''
                    className={style.youtube} // defaults -> ''
                    // iframeClassName={string}          // defaults -> ''

                    // title={string}                    // defaults -> ''
                    // loading={string}                  // defaults -> undefined
                    // opts={obj}                        // defaults -> {}
                    onReady={onReady} // defaults -> noop
                    onPlay={playSong} // defaults -> noop
                    onPause={pauseSong} // defaults -> noop
                    // onEnd={func}                      // defaults -> noop
                    // onError={func}                    // defaults -> noop
                    onStateChange={console.log} // defaults -> noop
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


