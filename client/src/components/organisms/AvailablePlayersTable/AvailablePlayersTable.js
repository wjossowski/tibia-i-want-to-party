import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
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
  handlePlayerSelected,
  isPlayerSelected,
  minLevel,
  maxLevel,
  world,
}) => (
  <>
    <h2>
      <FormattedMessage id="party.composer.table.title" values={{ world }} />
    </h2>
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

AvailablePlayersTable.defaultProps = {
  onlinePlayersByVocation: [],
}

AvailablePlayersTable.propTypes = {
  onlinePlayersByVocation: PropTypes.array.isRequired,
  characterVocation: PropTypes.string.isRequired,
  handlePlayerSelected: PropTypes.func.isRequired,
  isPlayerSelected: PropTypes.func.isRequired,
  minLevel: PropTypes.number.isRequired,
  maxLevel: PropTypes.number.isRequired,
  world: PropTypes.string.isRequired,
}
