import YouTube from "react-youtube";
import { useCallback, useEffect, useRef, useState } from "react";
import { PlayerDetails } from "./PlayerDetails.jsx";
import { PlayerControls } from "./PlayerControls.jsx";
import { PlayerProgress } from "./PlayerProgress.jsx";
import { PlayerAside, usePlayer } from "./PlayerAside.tsx";
import style from "../assets/styles/modules/youtube.module.scss";
import { useQueue } from "../store/useQueue.js";
import axios from "axios";
import { useColorPicker } from "../hooks/useColorPicker.js";
import PlayIcon from "../assets/icons/play.svg";
import PauseIcon from "../assets/icons/pause.svg";
import NextIcon from "../assets/icons/next.svg";
import PreviousIcon from "../assets/icons/previous.svg";

const { PlayerState } = YouTube;

const initialSongStatus = { play: false, duration: null, currentTime: 0 };
export const Player = () => {
  const currentTime = useRef(null);
  const { queue: [first, ...queue], remove, prev } = useQueue();
  const { currentVolume, isMuted } = usePlayer();
  const [progress, setProgress] = useState(null);
  const [songStatus, setSongStatus] = useState(initialSongStatus);
  const [player, setPlayer] = useState(null);
  const updateProgress = useCallback(() => {
    setSongStatus((prev) => ({ ...prev, currentTime: player?.getCurrentTime() || 0 }));
  }, [player]);
  const [track, setTrack] = useState(null);
  const { color, onImageLoad } = useColorPicker(track?.trackId);

  useEffect(() => {
    const getTrack = async () => {
      setSongStatus(initialSongStatus);
      if (!first) return;
      setSongStatus(initialSongStatus);
      const { data } = await axios.get("/api/song/" + first);
      setTrack(data);
    };
    getTrack();

  }, [first]);


  useEffect(() => {
    if (songStatus.play) {
      currentTime.current = setTimeout(updateProgress, 250);
    } else {
      clearTimeout(currentTime.current);
    }

    return () => setTimeout(currentTime.current);
  }, [updateProgress, songStatus, track?.youtubeId]);

  const onReady = (e) => {
    setPlayer(e.target);
    e.target.playVideo();
    const duration = e.target.getDuration();
    setSongStatus({ ...initialSongStatus, duration });
    e.target.setVolume(isMuted ? 0 : (currentVolume || 50));
  };

  const onStateChange = ({ data }) => {
    switch (data) {
      case PlayerState.ENDED:
        if (queue.length) {
          remove();
          console.log("next song");
        } else {
          clearTimeout(currentTime.current);
          setTimeout(() => setSongStatus(({ duration }) => ({ ...initialSongStatus, duration })), 500);
          console.log("no more songs");
        }
        break;
      case PlayerState.PLAYING:
        setTimeout(() => setProgress(null), 250);
        setSongStatus((prev) => ({ ...prev, play: true }));
        break;
      case PlayerState.PAUSED:
        setSongStatus((prev) => ({ ...prev, play: false }));
        break;
    }
  };

  const onPlayPause = useCallback(() => {
    setSongStatus((prev) => ({ ...prev, play: !prev.play }));
    songStatus?.play ? player?.pauseVideo() : player?.playVideo();

  }, [player, songStatus]);

  return (
    <div className="player" style={color ? { "--bg-base": color } : {}} data-visible={!!track}>
      <PlayerDetails track={track} onImageLoad={onImageLoad} />
      <div className="player-controls">
        <PlayerControls player={player} songStatus={songStatus} onPlayPause={onPlayPause} />
        <PlayerProgress
          player={player}
          songStatus={songStatus}
          progress={progress}
          setProgress={setProgress}
          track={track}
        />
        <div className="player-controls-mobile">
          <button disabled={player === null} onClick={prev}>
            <PreviousIcon className="previous-icon" />
          </button>
          <button disabled={player === null} onClick={onPlayPause}>
            {songStatus?.play ? <PauseIcon className="pause-icon" /> : <PlayIcon className="play-icon" />}
          </button>
          <button disabled={player === null} onClick={remove}>
            <NextIcon className="next-icon" />
          </button>
        </div>
      </div>
      <PlayerAside player={player} />
      {track && (
        <YouTube
          key={track.youtubeId}
          videoId={track.youtubeId}
          className={style.youtube}
          onReady={onReady}
          onStateChange={onStateChange}
        />
      )}
    </div>
  );
};
