import LibraryIcon from "../assets/icons/library.svg?react"
import RecentsIcon from "../assets/icons/recents.svg?react"
import SearchinlibraryIcon from "../assets/icons/searchinlibrary.svg?react"



export const Library = () => {
    return (
        <div >
            <ul className="navigation">
                <li>
                    <LibraryIcon className="library-icon" />Your Library
                    <SearchinlibraryIcon className="searchinlibrary-icon" />search 
                    Recents<RecentsIcon className="recents-icon" />
                </li>
            </ul>
        </div>
    )
}
