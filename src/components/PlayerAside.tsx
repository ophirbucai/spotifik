import VolumeOffIcon from '../assets/icons/volume-off.svg';
import VolumeLowIcon from '../assets/icons/volume-low.svg';
import VolumeMediumIcon from '../assets/icons/volume-medium.svg';
import VolumeHighIcon from '../assets/icons/volume-high.svg';
import { TrackBar } from './TrackBar';

import { create } from 'zustand';
import { useEffect } from 'react';
import { createJSONStorage, persist } from 'zustand/middleware';
import { YouTubePlayer } from 'react-youtube';

type PlayerStore = {
  isMuted: boolean;
  onMuteToggle: () => void;
  currentVolume: number;
  onVolumeChange: (value: number) => void;
};

export const usePlayer = create(persist<PlayerStore>((set) => ({
  isMuted: false,
  onMuteToggle: () => set(({ isMuted }) => ({ isMuted: !isMuted })),
  currentVolume: 100,
  onVolumeChange: (value) => set({ currentVolume: value, isMuted: value === 0 })
}), {
  name: 'player',
  storage: createJSONStorage(() => localStorage),
}));


export const PlayerAside = ({ player }: { player: YouTubePlayer | null }) => {
  const { onVolumeChange, currentVolume, isMuted, onMuteToggle } = usePlayer();

  useEffect(() => {
    const adjustPlayerVolume = () => {
      if (player === null) return;
      player.setVolume(isMuted ? 0 : currentVolume);
    };
    adjustPlayerVolume();

  }, [currentVolume, isMuted, player]);

  return (
    <div className="player-aside">
      <button onClick={onMuteToggle}>
        {isMuted ? <VolumeOffIcon /> : <>
          {currentVolume <= 30 && <VolumeLowIcon />}
          {currentVolume > 30 && currentVolume <= 70 && <VolumeMediumIcon />}
          {currentVolume > 70 && <VolumeHighIcon />}
        </>}
      </button>
      <div className="volume">
        <TrackBar value={isMuted ? 0 : currentVolume} onChange={(e) => onVolumeChange(e.target.valueAsNumber)} />
      </div>
    </div>
  );
};


// TODO: Implement queue and connecttodevice buttons
// import QueueIcon from '../assets/icons/queue.svg'
// import ConnecttodeviceIcon from '../assets/icons/connecttodevice.svg'
