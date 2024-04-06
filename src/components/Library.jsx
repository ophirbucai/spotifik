import LibraryIcon from "../assets/icons/library.svg";
import PlusIcon from "../assets/icons/plus.svg";
import { useState } from "react";
import { LibraryList } from "./LibraryList.jsx";
import RecentsIcon from "../assets/icons/recents.svg";
import SearchinlibraryIcon from "../assets/icons/searchinlibrary.svg";
import PropTypes from "prop-types";

export const Library = ({ onCollapse }) => {
  const [library] = useState([]);

  const createPlaylist = () => {
    try {
      // Todo: Implement create station
      // navigate(`/station/${stations[0]._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="library">
      <header className="library-header">
        <button className="library-header-toggle" onClick={onCollapse}>
          <LibraryIcon className="icon" />
          Your Library
        </button>
        <button onClick={createPlaylist} className="library-header-add">
          <PlusIcon className="icon-plus" />
        </button>
      </header>
      <div className="library-filter">
        <div role="group">
          {["Playlist", "Artists", "Albums", "Padcasts & Shows"].map(item => (
            <button key={item}>{item}</button>
          ))}
        </div>
      </div>
      <div className="library-list-wrapper">
        {library?.length ? <LibraryOptions /> : null}
        <LibraryList list={library} />
      </div>
    </div>
  );
};

Library.propTypes = {
  onCollapse: PropTypes.func.isRequired
};

const LibraryOptions = () => (
  <div className="library-options">
    <button className="library-options-search">
      <SearchinlibraryIcon className="searchinicon" />
    </button>
    <button className="library-options-sort">
      Recents
      <RecentsIcon className="recents-icon" />
    </button>
  </div>
);
