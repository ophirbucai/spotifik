import { useEffect, useState } from 'react'
import { BrowseGenres } from '../components/BrowseGenres.jsx'
import { SearchResults } from '../components/SearchResults'
import { searchService } from '../services/search.service.js'
import { useSearchParams } from 'react-router-dom'

export default function Search() {
    const [searchParams] = useSearchParams()
    const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState((searchParams.has('search') && searchService.search(searchParams.get('search'))) || [])
    const onSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    useEffect(() => {
        // TODO: Debounce 300ms after user stopped typing
        if (searchTerm.trim()) {
            const results = searchService.search(searchTerm)
            setResults(results || [])
        }
    }, [searchTerm])

    return (
        <div className='search'>
            <input className='search-input' placeholder='What do you want to listen to?' value={searchTerm} onChange={onSearchChange} />
            {(searchTerm.trim()
                    ? results.length
                        ? <SearchResults results={results} />
                        : 'no results'
                    : <BrowseGenres />
            )}
        </div>
    )
}

