import LibraryIcon from '../assets/icons/library.svg?react'
import RecentsIcon from '../assets/icons/recents.svg?react'
import SearchinlibraryIcon from '../assets/icons/searchinlibrary.svg?react'
import PlusIcon from '../assets/icons/plus.svg?react'
import { useEffect, useState } from 'react'
import { searchService } from '../services/search.service.js'


export const Library = () => {
    const [library, setLibrary] = useState([])
    useEffect(() => {
        const fetchLibrary = () => {
            const res = searchService.getPlaylists()
            setLibrary(res)
        }
        fetchLibrary()

    }, [])
    return (
        <div className='library'>
            <header className='library-actions'>
                <button className='toggle'><LibraryIcon className='icon' />Your Library</button>
                <button className='add'><PlusIcon className='icon-plus' /></button>
            </header>
            <div className='library-filter'>
                <div role='group'>
                    {['Playlist', 'Artists', 'Albums', 'Padcasts & Shows'].map((item) => (
                        <button key={item}>{item}</button>
                    ))}
                </div>
            </div>
            {library && (
                <div className='library-playlist'>
                    <div className='library-playlist-actions'>
                        <button className='search'><SearchinlibraryIcon className='searchinicon' /></button>
                        <button className='sort'>Recents<RecentsIcon className='recents-icon' /></button>
                    </div>
                    <ul>
                        {library.map((item) => (
                            <li key={item.id}>
                                <img src={item.cover} alt={item.name} />
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>{item.artist}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
