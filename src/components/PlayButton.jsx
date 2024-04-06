import PlayIcon from "../assets/icons/play.svg";
import PropTypes from "prop-types";
import { cn } from "../utils/cn.js";

export const PlayButton = ({ onClick, hover }) => {
  return (
    <button className={cn("play-button", hover && "hover")} onClick={onClick}>
      <PlayIcon />
    </button>
  );
};

PlayButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  hover: PropTypes.bool
};