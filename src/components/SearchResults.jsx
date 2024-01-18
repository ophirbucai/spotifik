import PropTypes from 'prop-types'

export const SearchResults = ({ results }) => {
    return (
        <div className="search-results">
            {results.map(({ thumbnail, trackName, artistName, trackLength, explicit }, i) => <div key={i} className="search-result">{artistName} - {trackName}</div>)}
        </div>
    )
}

SearchResults.propTypes = {
    results: PropTypes.arrayOf(PropTypes.shape({
        thumbnail: PropTypes.string.isRequired,
        trackName: PropTypes.string.isRequired,
        artistName: PropTypes.string.isRequired,
        trackLength: PropTypes.number.isRequired,
        explicit: PropTypes.bool.isRequired
    })).isRequired
}
