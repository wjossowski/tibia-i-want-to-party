import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import ReactTooltip from 'react-tooltip'
import request from '../api/request'
import { AvailablePlayersTable } from '../components/organisms/AvailablePlayersTable/AvailablePlayersTable'
import { PartySelection } from '../components/molecules/PartySelection/PartySelection'

import { matchVocations } from '../util/vocations'
import { countLevelRanges } from '../util/levelRanges'

class PartyComposerUnwrapped extends React.Component {
  state = {
    loading: true,
    selectedPlayers: [],
    minLevel: 0,
    maxLevel: 100,
  }

  componentDidMount = () => {
    request
      .get(`/party/${this.props.match.params.characterName}`)
      .then(({ data }) => {
        const { availableCharacters, character } = data.data
        const onlinePlayers = matchVocations(
          availableCharacters,
          character.level,
        )
        this.setState({
          loading: false,
          onlinePlayers,
          character,
          hasData: true,
          ...countLevelRanges(character),
        })
      })
      .catch((error) => {
        this.setState({ loading: false, error })
      })
  }

  handlePlayerSelected = (player) => {
    const selectedPlayers = [...this.state.selectedPlayers]
    const index = selectedPlayers.indexOf(player)
    if (index >= 0) {
      selectedPlayers.splice(index, 1)
    } else {
      selectedPlayers.push(player)
    }

    const levelRanges = countLevelRanges(this.state.character, selectedPlayers)

    this.setState({
      selectedPlayers,
      ...levelRanges,
    })
  }

  isPlayerSelected = (player) => this.state.selectedPlayers.includes(player)

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>
    }
    if (this.state.error) {
      return <h1>{this.state.error.message}</h1>
    }
    if (this.state.hasData) {
      const onlinePlayersByVocation = Object.entries(
        this.state.onlinePlayers,
      ).sort()
      if (onlinePlayersByVocation.length === 0) {
        return <h1>No active players for party :(</h1>
      }
      return (
        <>
          <PartySelection
            selectedPlayers={this.state.selectedPlayers}
            character={this.state.character}
            minLevel={this.state.minLevel}
            maxLevel={this.state.maxLevel}
          />
          <AvailablePlayersTable
            onlinePlayersByVocation={onlinePlayersByVocation}
            characterVocation={this.state.character.vocation}
            handlePlayerSelected={this.handlePlayerSelected}
            minLevel={this.state.minLevel}
            maxLevel={this.state.maxLevel}
            isPlayerSelected={this.isPlayerSelected}
            world={this.state.character.world}
          />

          <ReactTooltip effect="solid" />
        </>
      )
    }
    return 'error'
  }
}

PartyComposerUnwrapped.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      characterName: PropTypes.string,
    }),
  }),
}

export const PartyComposer = compose(withRouter)(PartyComposerUnwrapped)
