import VolumeOffIcon from "../assets/icons/volume-off.svg";
import VolumeLowIcon from "../assets/icons/volume-low.svg";
import VolumeMediumIcon from "../assets/icons/volume-medium.svg";
import VolumeHighIcon from "../assets/icons/volume-high.svg";
import { TrackBar } from "./TrackBar.jsx";
import PropTypes from "prop-types";

import { create } from "zustand";
import { useEffect } from "react";

export const usePlayer = create((set) => ({
  isMuted: false,
  onMuteToggle: () => set(({ isMuted }) => ({ isMuted: !isMuted })),
  currentVolume: null,
  onVolumeChange: (value) => set({ currentVolume: value, isMuted: value === 0 }),
  init: (data) => set({ isMuted: Boolean(data?.isMuted), currentVolume: +data?.currentVolume || 100 })
}));

export const PlayerAside = ({ player }) => {
  const { onVolumeChange, currentVolume, isMuted, onMuteToggle } = usePlayer();

  useEffect(() => {
    const adjustPlayerVolume = () => {
      if (player === null) return;
      player.setVolume(isMuted ? 0 : currentVolume);
    };
    adjustPlayerVolume();

  }, [currentVolume, isMuted]);

  return (
    <div className="player-aside">
      <button onClick={onMuteToggle}>
        {isMuted ? <VolumeOffIcon /> : (
          <>
            {currentVolume <= 30 && <VolumeLowIcon />}
            {currentVolume > 30 && currentVolume <= 70 && <VolumeMediumIcon />}
            {currentVolume > 70 && <VolumeHighIcon />}
          </>
        )}
      </button>
      <div className="volume">
        <TrackBar value={isMuted ? 0 : currentVolume} onChange={(e) => onVolumeChange(e.target.valueAsNumber)} />
      </div>
    </div>
  );
};

PlayerAside.propTypes = {
  player: PropTypes.object
};


// TODO: Implement queue and connecttodevice buttons
// import QueueIcon from '../assets/icons/queue.svg'
// import ConnecttodeviceIcon from '../assets/icons/connecttodevice.svg'
