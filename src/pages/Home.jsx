import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Thumbnail } from "../components/Thumbnail.jsx";
import { Link } from "react-router-dom";
import { useColumnCount } from "../hooks/useColumnCount.js";
import { PlayButton } from "../components/PlayButton.jsx";
import { useQueue } from "../store/useQueue.js";
import { getArtistNames } from "../utils/getArtistNames.js";

export default function Home() {
  const [containerRef, cssVariable] = useColumnCount();
  const [stations, setStations] = useState(null);
  const { add } = useQueue();

  const fetchLibrary = useCallback(async () => {
    const { data } = await axios.get("/api/station?limit=100");
    setStations((stations) => [...(stations || []), ...data]);

  }, []);


  useEffect(() => {
    fetchLibrary();

  }, [fetchLibrary]);


  const fetchStationAndPlay = useCallback(async (e, stationId) => {
    e.preventDefault();
    const { data } = await axios.get(`/api/station/${stationId}`);
    let { songs } = data;
    songs = songs.sort(() => Math.random() - 0.5);
    add(...songs.map((song) => song._id));
  }, [add]);

  return (
    <div className="home">
      <Link to="/station/hip-hop">
        <div className="banner play-within">
          <div>
            <h1>50 Years to <span>Hip Hop</span></h1>
            <p>Explore the history of Hip Hop through the decades</p>
          </div>
          <PlayButton hover onClick={(e) => fetchStationAndPlay(e, "hip-hop")} />
        </div>
      </Link>
      <section>
        <h2>Popular stations</h2>
        <div className="stations" ref={containerRef} style={cssVariable}>
          {stations && stations?.map(({ name, _id, songs }) => (
            <Link to={`/station/${_id}`} key={_id} className="station-card play-within">
              <Thumbnail cover={songs[0]?.artworkUrl100} youtubeId={songs[0]?.youtubeId} alt={name}>
                <PlayButton hover onClick={(e) => fetchStationAndPlay(e, _id)} />
              </Thumbnail>
              <span className="name">{name}</span>
              <small>{getArtistNames(songs)}</small>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
