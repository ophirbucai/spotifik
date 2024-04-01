import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { searchService } from '../services/search.service.js'
import { Thumbnail } from '../components/Thumbnail.jsx'
import PlayIcon from '../assets/icons/play.svg'
import { useQueue } from '../store/useQueue.js'
import { formatTime } from '../components/TrackCard.jsx'

const initialResults = {
    tracks: [],
    artists: [],
    playlists: []
}
export default function Results() {
    const { add } = useQueue()
    const { term } = useParams()
    const [status, setStatus] = useState('loading')
    const [results, setResults] = useState(initialResults)

    useEffect(() => {
        if (!term) return
        (async () => {
            try {
                setStatus('loading')
                setResults(initialResults)
                const { data } = await searchService.searchAll(term)
                //Todo: Fetch from backend const res = await fetch('/api/search/youtube/' + term)
                setTimeout(() => {
                    setResults(data)
                    setStatus('success')
                }, 300)

            } catch (error) {
                console.error(error)
                setStatus('error')
            }
        })()

    }, [term])

    return (
        <div className='results'>
            <h2>{status === 'loading' ? null : status === 'error' ? 'Failed to search' : results.tracks?.length > 0 ? 'Songs' : 'No Results Found'}</h2>
            {status === 'loading' ? <div className='search-results-shimmer'>{Array(6).fill(null).map((_, i) => (<div key={i}>{i}</div>))}</div> : null}
            <div className='search-results'>
                {results.tracks?.length ? results.tracks.map((song) => (
                    <button onDoubleClick={() => add(song._id)} onKeyUp={(e) => e.key === 'Enter' && add(song._id)} key={song._id} className='search-result'>
                        <Thumbnail cover={song.artworkUrl100} alt={song.trackName} />
                        <button className='play' onClick={() => add(song._id)}><PlayIcon /></button>
                        <h3>{song.trackName}</h3>
                        <p className='artist'>{song.artistName}</p>
                        <p className='duration'>{formatTime(Math.round(song.durationMs / 1000))}</p>
                    </button>
                )) : null}

            </div>
        </div>
    )
}