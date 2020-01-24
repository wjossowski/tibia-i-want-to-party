import React from 'react'
import styled from 'styled-components'
import { VocationColumn } from '../../molecules/VocationColumn/VocationColumn'
import { PlayerBadge } from '../../molecules/PlayerBadge/PlayerBadge'
import { isPlayerMatchingLevelRanges } from '../../../util/levelRanges'

const ColumnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: stretch;
`

export const AvailablePlayersTable = ({
  onlinePlayersByVocation,
  characterVocation,
  selectedPlayers,
  handlePlayerSelected,
  isPlayerSelected,
  minLevel,
  maxLevel,
  world,
}) => {
  return (
    <>
      <h2>Online players ({world})</h2>
      <ColumnContainer>
        {onlinePlayersByVocation.map(([vocation, players]) => {
          return (
            <VocationColumn
              title={vocation}
              isCharacterVocation={vocation === characterVocation}
              key={vocation}
            >
              {players
                .filter((player) =>
                  isPlayerMatchingLevelRanges(player, minLevel, maxLevel),
                )
                .map((player, i) => (
                  <PlayerBadge
                    key={`${vocation}.${i}`}
                    selected={isPlayerSelected(player)}
                    onClick={() => handlePlayerSelected(player)}
                    isLookingForParty={player.isLookingForParty}
                    {...player}
                  ></PlayerBadge>
                ))}
            </VocationColumn>
          )
        })}
      </ColumnContainer>
    </>
  )
}
