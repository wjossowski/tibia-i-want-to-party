import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { Input } from '../components/atoms/Input/Input'

class OnboardingUnwrapped extends React.Component {
  state = {
    playerName: '',
  }

  handlePlayerNameChange = (event) => {
    this.setState({ playerName: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.history.push(`/party/${this.state.playerName}`)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Enter your character name</h1>
        <Input
          value={this.state.playerName}
          onChange={this.handlePlayerNameChange}
        ></Input>
      </form>
    )
  }
}

OnboardingUnwrapped.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
}

export const Onboarding = compose(withRouter)(OnboardingUnwrapped)
