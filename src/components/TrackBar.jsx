import React from 'react'
import PropTypes from 'prop-types'

export const TrackBar = ({ max = 100, value, onChange, disabled }) => {
    const trackBarStyle = { width: `${value / max * 100}%` }
    return (
        <div className='track-bar'>
            <input
                disabled={disabled}
                className='track-bar-range'
                type='range'
                min={0}
                max={max}
                value={value}
                onChange={onChange}
            />
            <div className='track-bar-back'>
                <div className='track-bar-fill' style={trackBarStyle}></div>
            </div>
        </div>
    )
}

TrackBar.propTypes = {
    max: PropTypes.number,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}
