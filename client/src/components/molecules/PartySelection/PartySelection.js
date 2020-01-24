import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { PlayerBadge } from '../PlayerBadge/PlayerBadge'
import { Breadcrumbs } from '../../atoms/Breadcrumbs/Breadcrumbs'

import { calculateExpBoost } from '../../../util/experience'
import { playerNameCopiedNotification } from '../../../notifications/notifications'

const Container = styled.div`
  width: 80%;
  margin-bottom: 2rem;
`

const PartyMembersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-between;
  min-height: 4rem;
  spacing: 1rem;
`

export const PartySelection = ({
  title,
  selectedPlayers,
  character,
  minLevel,
  maxLevel,
  children,
}) => (
  <Container>
    <h2>
      Your party ({calculateExpBoost(selectedPlayers, character.vocation)}% exp
      boost)
    </h2>
    <h5>
      Level range: ({minLevel} - {maxLevel})
    </h5>
    <PartyMembersContainer>
      <PlayerBadge
        key={'mainCharacterContainer'}
        selected={true}
        displayedInRow={true}
        isCharacter={true}
        {...character}
      />
      {selectedPlayers.map((player, i) => (
        <CopyToClipboard
          text={player.name}
          onCopy={playerNameCopiedNotification}
          key={i}
        >
          <PlayerBadge
            selected={true}
            displayedInRow={true}
            {...player}
          ></PlayerBadge>
        </CopyToClipboard>
      ))}
    </PartyMembersContainer>
    <Breadcrumbs>
      Click on character's tile to copy name to clipboard
    </Breadcrumbs>
  </Container>
)

PartySelection.propTypes = {
  title: PropTypes.string.isRequired,
  selectedPlayers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      vocation: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  character: PropTypes.shape({
    vocation: PropTypes.string.isRequired,
  }).isRequired,
  minLevel: PropTypes.number.isRequired,
  maxLevel: PropTypes.number.isRequired,
  children: PropTypes.array.isRequired,
}
