import { useEffect, useLayoutEffect } from "react";
import { useQueue } from "../store/useQueue.js";
import { useLibrary } from "../store/useLibrary.js";
import { usePlayer } from "../components/PlayerAside.jsx";

const LIBRARY_KEY = "library";
const QUEUE_KEY = "queue";
const PLAYER_KEY = "player";
export const useCacheStores = () => {
  const { queue, pastQueue, init: initQueue } = useQueue();
  const { liked, disliked, init: initLibrary } = useLibrary();
  const { currentVolume, isMuted, init: initPlayer } = usePlayer();

  useEffect(() => {
    setTimeout(() => {
      initQueue(JSON.parse(localStorage.getItem(QUEUE_KEY)) || { queue: [], pastQueue: [] });
      initLibrary(JSON.parse(localStorage.getItem(LIBRARY_KEY)) || { liked: [], disliked: [] });
      initPlayer(JSON.parse(localStorage.getItem(PLAYER_KEY)) || { currentVolume: 50, isMuted: false });

    }, 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(LIBRARY_KEY, JSON.stringify({ liked, disliked }));

  }, [disliked, liked]);

  useEffect(() => {
    localStorage.setItem(QUEUE_KEY, JSON.stringify({ queue, pastQueue }));

  }, [queue, pastQueue]);

  useEffect(() => {
    localStorage.setItem(PLAYER_KEY, JSON.stringify({ currentVolume, isMuted }));

  }, [currentVolume, isMuted]);
};
