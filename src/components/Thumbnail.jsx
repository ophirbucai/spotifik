import { useEffect, useRef, useState } from 'react'
import TrackIcon from '../assets/icons/track.svg'
import PropTypes from 'prop-types'

export const Thumbnail = ({ youtubeId, alt, large = false }) => {
    const imgRef = useRef(null)
    const [showPlaceholder, setShowPlaceholder] = useState(false)
    function getCoverArt(youtubeId) {
        return `https://i.ytimg.com/vi/${youtubeId}/mqdefault.jpg`
    }
    function onImageLoad(e) {
        if (e.target.naturalHeight === 90 && e.target.naturalWidth === 120) {
            setShowPlaceholder(true)
        } else {
            imgRef.current.style.visibility = 'visible'
        }
    }

    useEffect(() => {
        let timeout
        if (youtubeId) {
            imgRef.current.src = getCoverArt(youtubeId)
        } else {
            timeout = setTimeout(setShowPlaceholder, 50, true)
        }
        return () => clearTimeout(timeout)
    }, [youtubeId])

    const src = getCoverArt(youtubeId)
    const style = { visibility: 'hidden' }
    return (
        <div className={'thumbnail' + (large ? ' large' : '')}>
            {showPlaceholder && <TrackIcon className='track-icon' />}
            {!showPlaceholder && youtubeId &&
                <img key={src} src={src} alt={alt} ref={imgRef} onLoad={onImageLoad} style={style} />}
        </div>
    )
}


Thumbnail.propTypes = {
    youtubeId: PropTypes.string,
    large: PropTypes.bool,
    alt: PropTypes.string
}
