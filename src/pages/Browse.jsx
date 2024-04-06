import { useEffect, useState } from "react";
import { generateRandomColors } from "../utils/randomColor.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { useColumnCount } from "../hooks/useColumnCount.js";
import { splitBySpaces } from "../utils/splitBySpaces.jsx";

export default function Browse() {
  const [colors, setColors] = useState([]);
  const [genres, setGenres] = useState(null);

  useEffect(() => {
    const getGenres = async () => {
      const { data: genres } = await axios.get("/api/genre");
      setColors(generateRandomColors(genres.length));
      setGenres(genres);
    };
    getGenres();

  }, []);

  return (
    <div className="browse">
      <h1>Browse all</h1>
      <section className="browse__cards">
        {genres && genres.map((genre, i) => (
          <Link
            to={`/genre/${genre.key}`}
            className="browse__card"
            style={{ background: `rgb(${colors[i].join(" ")})` }}
            key={genre.key}
            state={{ color: colors[i], genre: genre.genre }}
          >
            {splitBySpaces(genre.genre)}
          </Link>
        ))}
      </section>
      <button onClick={() => setColors(generateRandomColors(genres.length, true))} title="Not happy with the colors?">🪺</button>
    </div>
  );
}



