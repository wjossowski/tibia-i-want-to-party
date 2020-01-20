import React from 'react'
import styled from 'styled-components'
import { NotificationManager } from 'react-notifications'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { PlayerBadge } from '../../molecules/PlayerBadge/PlayerBadge'
import { Breadcrumbs } from '../../atoms/Breadcrumbs/Breadcrumbs'

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

const playerNameCopied = (name) => {
  NotificationManager.success(`${name} copied!`)
}

const calculateExpBoost = (selectedPlayers, characterVocation) => {
  const vocations = selectedPlayers.reduce(
    (vocations, { vocation }) => {
      if (!vocations.includes(vocation)) {
        vocations.push(vocation)
      }
      return vocations
    },
    [characterVocation],
  )

  if (selectedPlayers.length === 0) {
    return 0
  }

  switch (vocations.length) {
    case 1:
      return 20
    case 2:
      return 30
    case 3:
      return 60
    case 4:
    default:
      return 100
  }
}

export const PartySelection = ({
  title,
  children,
  selectedPlayers,
  character,
  minLevel,
  maxLevel,
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
        <CopyToClipboard text={player.name} onCopy={playerNameCopied} key={i}>
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
