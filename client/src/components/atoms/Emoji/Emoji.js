import React from 'react'
import PropTypes from 'prop-types'

export const Emoji = ({ label, symbol }) => (
  <span className="emoji" role="img" aria-label={label} aria-hidden={!!label}>
    {symbol}
  </span>
)

Emoji.defaultProps = {
  label: '',
  symbol: null,
}

Emoji.propTypes = {
  label: PropTypes.string,
  symbol: PropTypes.string,
}
