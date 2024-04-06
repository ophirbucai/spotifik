import { NavLink } from "react-router-dom";
import HomeIcon from "../assets/icons/home.svg";
import SearchIcon from "../assets/icons/search.svg";
import LibraryIcon from "../assets/icons/library.svg";

export const Navigation = () => {
  return (
    <div className="navigation-wrapper">
      <ul className="navigation">
        <li>
          <NavLink to="/" className="home-icon">
            <HomeIcon className="home-icon" />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/search">
            <SearchIcon className="search-icon" />
            Search
          </NavLink>
        </li>
        <li className="mobile-only">
          <NavLink to="/library" onClick={(e) => e.preventDefault()} style={{ opacity: 0.5 }}>
            <LibraryIcon className="icon" />
            Your Library
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
