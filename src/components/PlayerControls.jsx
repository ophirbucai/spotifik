import PropTypes from "prop-types";
import SwitchIcon from "../assets/icons/switch.svg";
import PreviousIcon from "../assets/icons/previous.svg";
import PauseIcon from "../assets/icons/pause.svg";
import PlayIcon from "../assets/icons/play.svg";
import NextIcon from "../assets/icons/next.svg";
import RepeatIcon from "../assets/icons/repeat.svg";
import { useQueue } from "../store/useQueue";


export const PlayerControls = ({ player, songStatus, onPlayPause }) => {
  const { remove, prev, queue, pastQueue } = useQueue();

  function nextSong() {
    remove();
  }

  function previousSong() {
    prev();
  }

  const noPlayerAvailable = player === null;
  const isNextDisabled = noPlayerAvailable && queue.length <= 1;
  const isPreviousDisabled = noPlayerAvailable && pastQueue.length === 0;

  return (
    <div className="player-controls-top">
      <button disabled={true}><SwitchIcon className="switch-icon" /></button>
      <button disabled={isPreviousDisabled} onClick={previousSong}><PreviousIcon className="previous-icon" /></button>
      <button disabled={noPlayerAvailable || !queue.length} onClick={onPlayPause}>
        {songStatus.play ? <PauseIcon className="pause-icon" /> : <PlayIcon className="play-icon" />}
      </button>
      <button disabled={isNextDisabled} onClick={nextSong}><NextIcon className="next-icon" /></button>
      <button disabled={true}><RepeatIcon className="repeat-icon" /></button>
    </div>
  );
};

PlayerControls.propTypes = {
  player: PropTypes.object,
  songStatus: PropTypes.object,
  onPlayPause: PropTypes.func.isRequired
};
