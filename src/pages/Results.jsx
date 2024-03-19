import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { searchService } from '../services/search.service.js'

export function Results() {
export default function Results() {
    const { term } = useParams()
    const [results, setResults] = useState([])

    useEffect(() => {
        const { tracks } = searchService.getTracksBySearchTerm(term)
        setResults(tracks || [])

    }, [term])

    return (
        <div className="wrapper">
            <div className='wrapper-content'>
                <h1>Tracks</h1>
                <div className="search-results">
                {results.length ? results.map(({ _id, thumbnail, name, artist, trackLength, explicit }, i) => (
                    <Link key={i} className='search-result' to={`/track/${_id}`}>
                        <img src={new URL(thumbnail)} alt={`Play ${name} by ${artist}`}  />
                        <span>{artist} - {name}</span>
                    </Link>
                )) : 'no results'}
                </div>
            </div>
        </div>
    )
}
