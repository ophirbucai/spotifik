import PropTypes from 'prop-types'
import { useCallback, useEffect } from 'react'
import { TrackBar } from './TrackBar.jsx'

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

    const value = (progress ?? songStatus.currentTime) || 0
    return (
        <div className='player-controls-bottom'>
            <div className='progress-time-now'>{player === null ? '-:--' : formatTime(value)}</div>
            <TrackBar
                max={songStatus.duration || 0}
                value={value}
                onChange={(event) => setProgress(event.target.valueAsNumber)}
            />
            <div className='progress-time-end'>{player === null ? '-:--' : formatTime(songStatus.duration)}</div>
        </div>
    )
}

PlayerProgress.propTypes = {
    player: PropTypes.object,
    songStatus: PropTypes.object,
    progress: PropTypes.number,
    setProgress: PropTypes.func
}
