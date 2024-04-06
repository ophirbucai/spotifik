import { useEffect, useState } from "react";
import TrackIcon from "../assets/icons/track.svg";
import PropTypes from "prop-types";
import { cn } from "../utils/cn.js";

export const Thumbnail = ({ youtubeId, cover, alt, onImageLoad, large = false, children, className }) => {
  const [showPlaceholder, setShowPlaceholder] = useState(!youtubeId && !cover);

  function getCoverArt(youtubeId) {
    return youtubeId ? `/images/${youtubeId}` : cover?.slice(34);
  }

  useEffect(() => {
    setShowPlaceholder(!youtubeId && !cover);
  }, [youtubeId, cover]);

  const src = getCoverArt(youtubeId);

  return (
    <div className={cn("thumbnail", large && "large", className)}>
      {showPlaceholder && <TrackIcon className="track-icon" />}
      {!showPlaceholder &&
        <img
          key={youtubeId}
          src={src}
          alt={alt}
          onLoad={(e) => {
            if (e.target.naturalHeight === 90 && e.target.naturalWidth === 120) {
              setShowPlaceholder(true);
            }
            onImageLoad && onImageLoad(e);
          }}
          onError={() => setShowPlaceholder(true)}
        />
      }
      {children}
    </div>
  );
};


Thumbnail.propTypes = {
  youtubeId: PropTypes.string,
  large: PropTypes.bool,
  alt: PropTypes.string,
  onImageLoad: PropTypes.func,
  cover: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string
};
