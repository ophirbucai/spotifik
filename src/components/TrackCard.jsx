import PropTypes from "prop-types";
import { useQueue } from "../store/useQueue.js";
import { Thumbnail } from "./Thumbnail.jsx";
import PlayIcon from "../assets/icons/play.svg";

export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${minutes}:${formattedSeconds}`;
}

export const TrackCard = ({ song }) => {
  const { add } = useQueue();


  return (
    <li className="track">
      <button
        className="index"
        onClick={() => add(song._id)}
        onDoubleClick={() => add(song._id)}
        onTouchEnd={() => add(song._id)}
        aria-label={`Play ${song.trackName}`}
      >
        <PlayIcon />
      </button>
      <div className="info">
        <div className="thumbnail">
          <Thumbnail cover={song.artworkUrl100} youtubeId={""} alt={song.trackName} />
        </div>
        <div className="name">{song.trackName}</div>
        <div className="artist">{song.artist.artistName}</div>
      </div>
      {/*<div className='album'> Album</div>*/}
      {/*<div className='date'>{new Date(song?.releaseDate).toLocaleDateString('en')}</div>*/}
      <div className="length">{formatTime(Math.round(song.durationMs / 1000))}</div>
    </li>
  );
};

TrackCard.propTypes = {
  song: PropTypes.object.isRequired,
  index: PropTypes.number
};
