import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Thumbnail } from "./Thumbnail.jsx";

export const LibraryList = ({ list }) => {
  return (
    <ul className="library-list">
      {list
        ? list?.length > 0
          ? list.map(item => <LibraryItem key={item._id} item={item} />)
          : <LibraryEmpty />
        : <LibraryItemPlaceholders items={5} />}
    </ul>
  );
};

const LibraryEmpty = () => (
  <div className="library-empty">
    <h2 className="library-empty-title">It's a bit empty here...</h2>
    <p className="library-empty-text">
      Find more of the music you love, or let us recommend something amazing for you.
    </p>
  </div>
);

const LibraryItem = ({ item: { _id, name, songs } }) => (
  <li className="library-list-item">
    <NavLink to={`/station/${_id}`} className="library-list-item-wrapper">
      <Thumbnail cover={songs[0]?.artworkUrl100} youtubeId={songs[0]?.youtubeId} alt={name} />
      <div>
        <p className="library-list-item-name">{name}</p>
        <p className="library-list-item-author">Station • Spotifik</p>
      </div>
    </NavLink>
  </li>
);

LibraryItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    songs: PropTypes.array.isRequired
  })
};

const LibraryItemPlaceholders = ({ items }) => (
  <>
    {Array(items)
      .fill(null)
      .map((_, i) => (
        <LibraryItemPlaceholder key={i} />
      ))}
  </>
);

LibraryItemPlaceholders.propTypes = {
  items: PropTypes.number.isRequired
};

const LibraryItemPlaceholder = () => (
  <li className="library-list-item">
    <div className="library-list-item-wrapper">
      <div className="library-list-item-cover"></div>
      <div>
        <p className="library-list-item-name"></p>
        <p className="library-list-item-author"></p>
      </div>
    </div>
  </li>
);

LibraryList.propTypes = {
  list: PropTypes.arrayOf(LibraryItem.propTypes.item)
};
