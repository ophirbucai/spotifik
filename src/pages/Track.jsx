import { useGetEntity } from '../hooks/useGetEntity.js'
import { Link, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function Track() {
    const { id } = useParams()
    const { track, error, status } = useGetEntity('track', id)

    return (
        <div className='track-page'>
            {status === 'loading' && 'Loading track details...'}
            {status === 'error' && <ErrorMessage error={error} />}
            {status === 'success' && (
                <div className='wrapper'>
                    <div className='wrapper-overlay'>
                        <img className='wrapper-cover' src={track.thumbnail} alt={track.name + ' by ' + track.artist} />
                    </div>
                    <div className='wrapper-content'>
                        <h1>{track.name}</h1>
                        <h2>{track.artist.name}</h2>
                        <button className='btn-primary'>Listen now :)</button>
                    </div>
                </div>
            )}
        </div>
    )
}


export const ErrorMessage = ({ error }) => {
    return (
        <div className='wrapper'>
            <div className='wrapper-content'>
                <h1>Sorry, there was a problem!</h1>
                <h2>{error?.message}</h2>
                <div>
                    <p>Please <Link to='/help'>reach out</Link> if this error persists, so that we can solve it.</p>
                </div>
            </div>
        </div>
    )
}

ErrorMessage.propTypes = {
    error: PropTypes.string.isRequired
}
