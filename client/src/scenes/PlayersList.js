import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import ReactTooltip from 'react-tooltip'
import request from '../api/request'
import { PlayerBadge } from '../components/molecules/PlayerBadge/PlayerBadge'
import { VocationColumn } from '../components/organisms/VocationColumn/VocationColumn'
import { PartySelection } from '../components/organisms/PartySelection/PartySelection'

const ColumnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: stretch;
`

class PlayersListUnwrapped extends React.Component {
  state = {
    loading: true,
    selectedPlayers: [],
  }

  matchVocations = (players, characterLevel) => {
    const playersByVocation = players.reduce((playersByCategory, player) => {
      if (playersByCategory[player.vocation]) {
        playersByCategory[player.vocation].push(player)
      } else {
        playersByCategory[player.vocation] = [player]
      }

      return playersByCategory
    }, {})

    for (let vocation of Object.keys(playersByVocation)) {
      playersByVocation[vocation] = playersByVocation[vocation].sort(
        (p1, p2) => {
          const diff1 = Math.abs(p1.level - characterLevel)
          const diff2 = Math.abs(p2.level - characterLevel)

          return diff1 - diff2
        },
      )
    }

    return playersByVocation
  }

  componentDidMount = () => {
    request
      .get(`/party/${this.props.match.params.characterName}`)
      .then(({ data }) => {
        const { availableCharacters, character } = data.data
        const onlinePlayers = this.matchVocations(
          availableCharacters,
          character.level,
        )
        this.setState({
          loading: false,
          onlinePlayers,
          character,
          hasData: true,
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

    this.setState({
      selectedPlayers,
    })
  }

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
          />
          <h2>Online players ({this.state.character.world})</h2>
          <ColumnContainer>
            {onlinePlayersByVocation.map(([vocation, players]) => {
              return (
                <VocationColumn
                  title={vocation}
                  isCharacterVocation={
                    vocation === this.state.character.vocation
                  }
                  key={vocation}
                >
                  {players.map((player, i) => (
                    <PlayerBadge
                      key={`${vocation}.${i}`}
                      selected={this.state.selectedPlayers.includes(player)}
                      onClick={() => this.handlePlayerSelected(player)}
                      isLookingForParty={player.isLookingForParty}
                      {...player}
                    ></PlayerBadge>
                  ))}
                </VocationColumn>
              )
            })}
          </ColumnContainer>

          <ReactTooltip effect="solid" />
        </>
      )
    }
    return 'error'
  }
}

export const PlayersList = compose(withRouter)(PlayersListUnwrapped)
