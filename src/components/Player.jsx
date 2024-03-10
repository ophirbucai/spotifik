import YouTube from 'react-youtube'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useGetEntity } from '../hooks/useGetEntity.jsx'
import { PlayerDetails } from './PlayerDetails.jsx'
import { PlayerControls } from './PlayerControls.jsx'
import { PlayerProgress } from './PlayerProgress.jsx'
import { PlayerAside } from './PlayerAside.jsx'
import style from '../assets/styles/modules/youtube.module.scss'
import { useQueue } from '../store/useQueue.js'

const { PlayerState } = YouTube
export const Player = () => {
    const currentTime = useRef(null)
    const { queue } = useQueue()
    const { track /*error, status*/ } = useGetEntity('track', queue[0])
    const [progress, setProgress] = useState(null)
    const [songStatus, setSongStatus] = useState({ play: false, duration: null, currentTime: 0 })
    const [player, setPlayer] = useState(null)
    const updateProgress = useCallback(() => {
        setSongStatus((prev) => ({ ...prev, currentTime: player?.getCurrentTime() || 0 }))
    }, [player])

    useEffect(() => {
        if (songStatus.play) {
            currentTime.current = setInterval(updateProgress, 250)
        }

        return () => clearInterval(currentTime.current)
    }, [updateProgress, songStatus.play])

    const onReady = (e) => {
        setPlayer(e.target)
        e.target.playVideo()
        const duration = e.target.getDuration()
        setSongStatus({ ...songStatus, duration })
    }

    const onStateChange = ({ data }) => {
        switch (data) {
            case PlayerState.ENDED:
                setTimeout(() => setSongStatus((prev) => ({ ...prev, play: false })), 250)
                break
            case PlayerState.PLAYING:
                setTimeout(() => setProgress(null), 150)
                setSongStatus((prev) => ({ ...prev, play: true }))
                break
            case PlayerState.PAUSED:
                setSongStatus((prev) => ({ ...prev, play: false }))
                break
        }
    }

    return (
        <div className='player'>
            <PlayerDetails track={track} />
            <div className='player-controls'>
                <PlayerControls player={player} songStatus={songStatus} />
                <PlayerProgress player={player} songStatus={songStatus} progress={progress} setProgress={setProgress} />
            </div>
            <PlayerAside player={player} />
            {track && (
                <YouTube
                    key={track.youtubeId}
                    videoId={track.youtubeId}
                    className={style.youtube}
                    onReady={onReady}
                    onEnd={console.log}
                    onStateChange={onStateChange}
                />
            )}
        </div>
    )
}
