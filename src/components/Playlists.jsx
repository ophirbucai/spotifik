import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Thumbnail } from './Thumbnail.jsx'
import { useEffect, useRef, useState } from 'react'

export const Playlists = ({ playlists }) => {
    const containerRef = useRef(null)
    const [containerWidth, setContainerWidth] = useState()
    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setContainerWidth(entry.contentRect.width)
            }
        })
        resizeObserver.observe(containerRef.current)
        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    const columnCountCSSProperty = { '--column-count': `${Math.round(containerWidth / 180)}` }
    return (
        <section className='playlists' ref={containerRef} style={{ ...columnCountCSSProperty }}>
            {playlists.map(({ songs, _id, name, description }) => {
                const songsCount = songs.length
                return (
                    <Link key={_id} to={`/playlist/${_id}`} className='playlist-card'>
                        <Thumbnail youtubeId={songs[0].youtubeId} alt={name} />
                        <span className='name'>{name}</span>
                        <small>{description ?? songsCount === 1 ? `${songsCount} song` : `${songsCount} songs`}</small>
                    </Link>
                )
            })}
        </section>
    )
}

Playlists.propTypes = {
    playlists: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            name: PropTypes.string.isRequired,
            songs: PropTypes.array.isRequired
        })
    ).isRequired
}
