import LibraryIcon from '../assets/icons/library.svg'
import PlusIcon from '../assets/icons/plus.svg'
import { useEffect, useState } from 'react'
import { searchService } from '../services/search.service.js'
import { useNavigate } from 'react-router-dom'
import { LibraryList } from './LibraryList.jsx'
import RecentsIcon from '../assets/icons/recents.svg'
import SearchinlibraryIcon from '../assets/icons/searchinlibrary.svg'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const Library = () => {
    const [playlists, setPlaylists] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchLibrary = async () => {
            const res = searchService.getPlaylists()
            await sleep(1000)
            setPlaylists(res)
        }
        fetchLibrary()
    }, [])

    const createPlaylist = () => {
        try {
            const { data: playlists } = searchService.createPlaylist()
            setPlaylists(playlists)
            navigate(`/playlist/${playlists[0]._id}`)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='library'>
            <header className='library-header'>
                <button className='library-header-toggle'>
                    <LibraryIcon className='icon' />
                    Your Library
                </button>
                <button onClick={createPlaylist} className='library-header-add'>
                    <PlusIcon className='icon-plus' />
                </button>
            </header>
            <div className='library-filter'>
                <div role='group'>
                    {['Playlist', 'Artists', 'Albums', 'Padcasts & Shows'].map(item => (
                        <button key={item}>{item}</button>
                    ))}
                </div>
            </div>
            <div className='library-list-wrapper'>
                {playlists?.length && <LibraryOptions />}
                <LibraryList list={playlists} />
            </div>
        </div>
    )
}

const LibraryOptions = () => (
    <div className='library-options'>
        <button className='library-options-search'>
            <SearchinlibraryIcon className='searchinicon' />
        </button>
        <button className='library-options-sort'>
            Recents
            <RecentsIcon className='recents-icon' />
        </button>
    </div>
)
