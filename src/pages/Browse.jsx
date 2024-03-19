import { useEffect, useState } from 'react'
import { searchService } from '../services/search.service.js'
import { generateRandomColors } from '../utils/randomColor.js'
import { Link } from 'react-router-dom'

export default function Browse() {
    const [colors, setColors] = useState(generateRandomColors())
    const [genres, setGenres] = useState(null)
    useEffect(() => {
        const getGenres = () => {
            const genres = searchService.getGenres()
            setGenres(genres)
        }
        getGenres()
    }, [])

    useEffect(() => {
        fetch('/api').then(res => res.text()).then(console.log)
    }, [])

    return (
        <div className='browse'>
            <h1>Browse All</h1>
            <section>
                {genres && genres.map((genre, i) => (
                    <Link
                        to={`/genre/${genre._id}`}
                        className='card'
                        style={{ background: `rgb(${colors[i].join(' ')})` }}
                        key={genre._id}
                        state={{ color: colors[i] }}
                    >
                        {genre.name}
                    </Link>
                ))}
            </section>
            <button onClick={() => setColors(generateRandomColors(true))} title='Not happy with the colors?'>🪺</button>
        </div>
    )
}



