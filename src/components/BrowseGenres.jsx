import { dummyTags } from '../services/station.service.js'
import { Link } from 'react-router-dom'

export const BrowseGenres = () => {
    return (
        <div className="browse">
            <h1>Browse All</h1>
            {dummyTags.map(({ color, tag, _id }) => {
                return <Link to={`/genre/${_id}`} key={tag} style={{ background: color }}>{tag}</Link>
            })}
        </div>
    )
}
