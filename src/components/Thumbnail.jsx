import { useEffect, useState } from 'react'
import TrackIcon from '../assets/icons/track.svg'
import PropTypes from 'prop-types'

export const Thumbnail = ({ youtubeId, cover, alt, onImageLoad, large = false }) => {
    const [showPlaceholder, setShowPlaceholder] = useState(!youtubeId && !cover)

    function getCoverArt(youtubeId) {
        return youtubeId ? `/images/${youtubeId}` : cover
    }

    useEffect(() => {
        setShowPlaceholder(!youtubeId && !cover)
    }, [youtubeId, cover])

    const src = getCoverArt(youtubeId)

    return (
        <div className={'thumbnail' + (large ? ' large' : '')}>
            {showPlaceholder && <TrackIcon className='track-icon' />}
            {!showPlaceholder &&
                <img
                    key={youtubeId}
                    src={src}
                    alt={alt}
                    onLoad={(e) => {
                        if (e.target.naturalHeight === 90 && e.target.naturalWidth === 120) {
                            setShowPlaceholder(true)
                        }
                        onImageLoad && onImageLoad(e)
                    }}
                    onError={() => setShowPlaceholder(true)}
                />
            }
        </div>
    )
}


Thumbnail.propTypes = {
    youtubeId: PropTypes.string,
    large: PropTypes.bool,
    alt: PropTypes.string,
    onImageLoad: PropTypes.func,
    cover: PropTypes.string
}
