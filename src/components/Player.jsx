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

const initialSongStatus = { play: false, duration: null, currentTime: 0 }
export const Player = () => {
    const currentTime = useRef(null)
    const { queue: [first, ...queue], remove } = useQueue()
    const { track /*error, status*/ } = useGetEntity('track', first)
    const [progress, setProgress] = useState(null)
    const [songStatus, setSongStatus] = useState(initialSongStatus)
    const [player, setPlayer] = useState(null)
    const updateProgress = useCallback(() => {
        setSongStatus((prev) => ({ ...prev, currentTime: player?.getCurrentTime() || 0 }))
    }, [player])

    useEffect(() => {
        if (songStatus.play) {
            currentTime.current = setTimeout(updateProgress, 100)
        } else {
            clearTimeout(currentTime.current)
        }

        return () => setTimeout(currentTime.current)
    }, [updateProgress, songStatus])

    const onReady = (e) => {
        setPlayer(e.target)
        e.target.playVideo()
        const duration = e.target.getDuration()
        setSongStatus({ ...initialSongStatus, duration })
    }

    const onStateChange = ({ data }) => {
        console.log(data)
        switch (data) {
            case PlayerState.ENDED:
                if (queue.length) {
                    remove()
                    console.log('next song')
                } else {
                    clearTimeout(currentTime.current)
                    setTimeout(() => {
                        setSongStatus((prev) => ({ ...prev, play: false, currentTime: 0 }))
                    }, 100)
                    console.log('no more songs')
                }
                setTimeout(() => setSongStatus((prev) => ({ ...prev, play: false, currentTime: 0 })), 250)
                break
            case PlayerState.PLAYING:
                setTimeout(() => setProgress(null), 250)
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
                    onStateChange={onStateChange}
                />
            )}
        </div>
    )
}
