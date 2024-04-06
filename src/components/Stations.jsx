import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Thumbnail } from "./Thumbnail.jsx";
import { useColumnCount } from "../hooks/useColumnCount.js";
import { getArtistNames } from "../utils/getArtistNames.js";

export const Stations = ({ stations }) => {
  const [containerRef, cssVariable] = useColumnCount();
  return (
    <section className="stations" ref={containerRef} style={cssVariable}>
      {stations.map(({ key, genre, stations }) => {
        const station = stations?.[0];
        const firstSong = station?.songs?.[0];
        return (
          <Link key={key} to={`/station/${key}`} className="station-card">
            <Thumbnail
              youtubeId={station?.songs?.[0]?.youtubeId}
              cover={firstSong?.artworkUrl100 || station?.imageId}
              alt={genre} />
            <span className="name">{genre}</span>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <small>{station?.songs ? getArtistNames(station.songs) : "Editors' Choice"}</small>
            {/*<small>{songsCount > 0 ? `${songsCount} song${songsCount === 0 ? "" : "s"}` : "Editors' Choice"}</small>*/}
          </Link>
        );
      })}
    </section>
  );
};

Stations.propTypes = {
  stations: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      genre: PropTypes.string.isRequired,
      stations: PropTypes.array
    })
  )
};

