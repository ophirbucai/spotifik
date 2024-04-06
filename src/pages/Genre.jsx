import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Stations } from "../components/Stations.jsx";
import axios from "axios";
import { splitBySpaces } from "../utils/splitBySpaces.jsx";

export default function Genre() {
  const location = useLocation();
  const color = location.state?.color;
  const [genre, setGenre] = useState(location.state?.genre);
  const [stations, setStations] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getStations = async () => {
      const { data } = await axios.get("/api/genre/" + id);
      if (!genre) setGenre(data.genre);
      setStations(data.subgenres);
    };
    getStations();

  }, [id]);


  return (
    <div className="genre" style={color ? { "--bg-base": color.join(" ") } : undefined}>
      <header className="genre__header">{genre ? <h1>{splitBySpaces(genre)}</h1> : "Loading..."}</header>
      <section className="genre__content">
        {stations && (
          <>
            <h2>Discover new music with these playlists</h2>
            <Stations stations={stations} />
          </>
        )}
      </section>
    </div>
  );
}

