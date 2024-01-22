import { useRef, useState } from 'react'
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom'

export default function Search() {
    const { term } = useParams()
    const timeoutId = useRef(null)
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState(term || '')

    const onSearchChange = (e) => {
        setSearchTerm(e.target.value)
        debouncedNavigate(e.target.value)
    }

    const debouncedNavigate = (term) => {
        clearTimeout(timeoutId.current)
        timeoutId.current = setTimeout(() => {
            navigate(term ? `/search/${term}` : '/search')
        }, 300)
    }


    return (
        <div className='search'>
            <input className='search-input' placeholder='What do you want to listen to?' value={searchTerm} onChange={onSearchChange} />
            <Outlet />
        </div>
    )
}

