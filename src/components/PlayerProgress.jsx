import PropTypes from 'prop-types'
import { useCallback, useEffect } from 'react'

export const PlayerProgress = ({ player, songStatus, progress, setProgress }) => {
    function formatTime(time) {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${String(minutes).padStart(1, '0')}:${String(seconds).padStart(2, '0')}`
    }

    const onDurationChange = useCallback(() => {
        player.seekTo(progress, true)
        if (!songStatus.play) {
            player.playVideo()
        }

    }, [songStatus.play, player, progress])

    useEffect(() => {
        if (progress !== null) {
            window.addEventListener('mouseup', onDurationChange)
        }
        return () => window.removeEventListener('mouseup', onDurationChange)
    }, [onDurationChange, progress])

    const progressBarStyle = { width: `${(progress || songStatus.currentTime) / songStatus.duration * 100}%` }

    return (
        <div className='player-controls-bottom'>
            <div className='progress-time-now'>{formatTime(songStatus.currentTime)}</div>
            <div className='progress-bar'>
                <div className='progress-bar-fill' style={progressBarStyle}></div>
            </div>
            <input
                type='range'
                min={0}
                max={songStatus.duration || 0}
                value={(progress || songStatus.currentTime) || 0}
                onChange={(event) => setProgress(event.target.value)}
            />
            <div className='progress-time-end'>{formatTime(songStatus.duration)}</div>
        </div>
    )
}

PlayerProgress.propTypes = {
    player: PropTypes.object,
    songStatus: PropTypes.object,
    progress: PropTypes.number,
    setProgress: PropTypes.func
}
