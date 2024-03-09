import YouTube from 'react-youtube'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useGetEntity } from '../hooks/useGetEntity.jsx'
import { PlayerDetails } from './PlayerDetails.jsx'
import { PlayerControls } from './PlayerControls.jsx'
import { PlayerProgress } from './PlayerProgress.jsx'
import { PlayerAside } from './PlayerAside.jsx'
import style from '../assets/styles/modules/youtube.module.scss'

export const NowPlaying = () => {
    const currentTime = useRef(null)
    const { track /*error, status*/ } = useGetEntity('track', 'talk_is_cheap')
    const [progress, setProgress] = useState(null)
    const [songStatus, setSongStatus] = useState({ play: false, duration: null, currentTime: 0 })
    const [player, setPlayer] = useState(null)
    const updateProgress = useCallback(() => {
        if (songStatus.play) {
            setSongStatus((prev) => ({ ...prev, currentTime: player?.getCurrentTime() || 0 }))
        }
    }, [player, songStatus.play])

    useEffect(() => {
        currentTime.current = setInterval(updateProgress, 250)

        return () => clearInterval(currentTime.current)
    }, [updateProgress])

    const onReady = (e) => {
        setPlayer(e.target)
        const duration = e.target.getDuration()
        setSongStatus({ ...songStatus, duration })
    }

    const onStateChange = ({ data }) => {
        switch (data) {
            case 1:
                setTimeout(setProgress, 150, null)
                setSongStatus((prev) => ({ ...prev, play: true }))
                break
            case 2:
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
            <PlayerAside />{/* TODO: Implement queue and volume control*/}
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
