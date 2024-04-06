import ClockIcon from "../assets/icons/clock.svg";
import { useParams } from "react-router-dom";
import { ErrorMessage } from "./Track.jsx";
import { TrackCard } from "../components/TrackCard.jsx";
import { Thumbnail } from "../components/Thumbnail.jsx";
import { useQueue } from "../store/useQueue.js";
import { useColorPicker } from "../hooks/useColorPicker.js";
import { PlayButton } from "../components/PlayButton.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { Shimmer } from "../components/Shimmer.jsx";

export default function Station() {
  const { id } = useParams();
  const [station, setStation] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("loading");
  const { color, onImageLoad } = useColorPicker(station?.imageId);
  const { add } = useQueue();

  useEffect(() => {
    const getStation = async () => {
      setStatus("loading");
      setStation(null);
      try {
        const { data } = await axios.get("/api/station/" + id);
        setStation(data);
        setStatus("success");
      } catch (error) {
        setError(error);
        console.error(error);
      }
    };
    getStation();
    // if (error) {
    //     navigate('/404')
    // }
  }, [id]);
  const count = station?.songs?.length || 0;
  return (
    <div className="station" style={color ? { "--bg-base": color } : undefined}>
      <Shimmer active={status === "loading"} />
      {status === "error" && <ErrorMessage error={error} />}
      {status === "success" && (
        <>
          <div className="station__header bg">
            <Thumbnail
              onImageLoad={onImageLoad}
              youtubeId={station?.songs?.[0]?.youtubeId}
              cover={station.songs[0]?.artworkUrl100 || station?.imageId} alt={station.name} large
            />
            <header className="details">
              <small className="entity">Playlist</small>
              <h1 className="name">{station.name}</h1>
              {station.description && <p className="description">{station.description}</p>}
              <div>
                {station.author && <span className="author">{station.author}</span>}
                {station?.songs?.length > 0 &&
                  <small>Editors' Choice • {count} song{count > 1 ? "s" : ""}</small>}
              </div>
            </header>
          </div>
          <section className="station__content">
            <div className="station__panel">
              {station.songs?.length &&
                <PlayButton onClick={() => add(...station?.songs.map(({ _id }) => _id))} />}
            </div>
            <div className="station__table">
              <div className="station__table__header">
                <div className="one">#</div>
                <div className="two">Title</div>
                {/*<div className='three'>Album</div>*/}
                {/*<div className='four'>Date added</div>*/}
                <div className="five"><ClockIcon /></div>
              </div>
              <div className="divider"></div>
              <ol className="station__table__content">
                {station?.songs?.length ? station?.songs.map((song, index) => {
                  return <TrackCard key={song._id} song={song} index={index + 1} />;
                }) : null}
              </ol>
            </div>
          </section>
        </>
      )}
    </div>
  );
}


