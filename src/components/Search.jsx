import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SearchIcon from '../assets/icons/search.svg'

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

    useEffect(() => {
        setSearchTerm(term || '')
    }, [term])


    return (
        <form className='search' onSubmit={(e) => {
            e.preventDefault()
            navigate(searchTerm ? `/search/${searchTerm}` : '/search')
        }}>
            <input
                className='search-input'
                placeholder='What do you want to listen to?'
                value={searchTerm}
                onChange={onSearchChange}
                autoCorrect='off'
            />
            <SearchIcon className='search-icon' />
        </form>
    )
}

