import React from "react";
import { Thumbnail } from "./Thumbnail.jsx";
import PropTypes from "prop-types";

export const PlayerDetails = ({ track, onImageLoad }) => {
  return (
    <div className="player-details">
      <Thumbnail onImageLoad={onImageLoad} cover={track?.artworkUrl100} alt={track?.trackName} />
      <h3>{track?.trackName}</h3>
      <p>{track?.artist?.artistName}</p>
    </div>
  );
};

PlayerDetails.propTypes = {
  track: PropTypes.shape({
    youtubeId: PropTypes.string,
    trackName: PropTypes.string,
    artist: PropTypes.object,
    artworkUrl100: PropTypes.string
  }),
  onImageLoad: PropTypes.func
};
