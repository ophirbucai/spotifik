import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

export const LibraryList = ({ list }) => {
    return (
        <ul className='library-list'>
            {list ? list.length > 0 ? (
                    list.map((item) => (
                        <LibraryItem key={item._id} item={item} />
                    ))) : (
                    <LibraryEmpty />
                )
                : (
                    <LibraryItemPlaceholders items={5} />
                )}
        </ul>

    )
}


const LibraryEmpty = () => (
    <div className='library-empty'>
        <h2 className='library-empty-title'>It's a bit empty here...</h2>
        <p className='library-empty-text'>Find more of the music you love, or let us recommend something amazing for you.</p>
    </div>
)

const LibraryItem = ({ item: { _id, author, name, cover } }) => (
    <li className='library-list-item'>
        <NavLink to={`/playlist/${_id}`} className='library-list-item-wrapper'>
            <img src={cover} alt={name} className='library-list-item-cover' />
            <div>
                <p className='library-list-item-name'>{name}</p>
                <p className='library-list-item-author'>{author}</p>
            </div>
        </NavLink>
    </li>
)

LibraryItem.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired
    })
}

const LibraryItemPlaceholders = ({ items }) => (
    <>
        {Array(items).fill(null).map((_, i) => (
            <LibraryItemPlaceholder key={i} />
        ))}
    </>
)

LibraryItemPlaceholders.propTypes = {
    items: PropTypes.number.isRequired
}

const LibraryItemPlaceholder = () => (
    <li className='library-list-item'>
        <div className='library-list-item-wrapper'>
            <div className='library-list-item-cover'></div>
            <div>
                <p className='library-list-item-name'></p>
                <p className='library-list-item-author'></p>
            </div>
        </div>
    </li>
)


LibraryList.propTypes = {
    list: PropTypes.arrayOf(LibraryItem.propTypes.item)
}

