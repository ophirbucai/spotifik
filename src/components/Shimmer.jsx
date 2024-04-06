import PropTypes from 'prop-types'

export const Shimmer = ({ active, quantity = 6 }) => {
    return active ? <div className='shimmer'>{Array(quantity).fill(null).map((_, i) => (<div key={i}>{i}</div>))}</div>: null
}

Shimmer.propTypes = {
    active: PropTypes.bool.isRequired,
    quantity: PropTypes.number
}