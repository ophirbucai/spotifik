import LibraryIcon from '../assets/icons/library.svg?react'
import PlusIcon from '../assets/icons/plus.svg?react'
import { useEffect, useState } from 'react'
import { searchService } from '../services/search.service.js'
import { LibraryList } from './LibraryList.jsx'
import RecentsIcon from '../assets/icons/recents.svg?react'
import SearchinlibraryIcon from '../assets/icons/searchinlibrary.svg?react'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const Library = () => {
    const [playlists, setPlaylists] = useState(null)

    useEffect(() => {
        const fetchLibrary = async () => {
            const res = searchService.getPlaylists()
            await sleep(3000)
            setPlaylists(res)
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
            <div className='library-list-wrapper'>
                {playlists?.length && <LibraryListActions />}
                <LibraryList
                    list={playlists} />
            </div>
        </div>
    )
}

const LibraryListActions = () => (
    <div className='library-list-actions'>
        <button className='search'><SearchinlibraryIcon className='searchinicon' /></button>
        <button className='sort'>Recents<RecentsIcon className='recents-icon' /></button>
    </div>
)
