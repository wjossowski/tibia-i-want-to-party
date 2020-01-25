import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useIntl } from 'react-intl'
import { Breadcrumbs } from '../../atoms/Breadcrumbs/Breadcrumbs'
import { PlayerName } from '../../atoms/PlayerName/PlayerName'
import { Emoji } from '../../atoms/Emoji/Emoji'

const ColumnContainer = styled.span`
  border-bottom: 1px solid black;
  justify-content: center;
  padding: 0.25rem;
  min-height: 4rem;
  display: flex;
  flex-direction: column;
  background-color: ${({ selected, isCharacter, isLookingForParty }) =>
    isCharacter
      ? '#9A7D32'
      : selected
      ? 'green'
      : isLookingForParty
      ? 'rgba(0, 50, 0, 0.4)'
      : 'transparent'};
  border-left: ${({ displayedInRow }) =>
    displayedInRow ? '1px solid black' : '0'};
  border-right: ${({ displayedInRow }) =>
    displayedInRow ? '1px solid black' : '0'};
  margin: ${({ displayedInRow }) => (displayedInRow ? '0.25rem' : '0')};
`

const RowContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const PlayerDataContainer = styled.span``

const mapVocation = (fullVocation) => {
  const words = fullVocation.split(' ')
  return words.length === 1
    ? fullVocation
    : words.map(([letter]) => letter).join('')
}

export const PlayerBadge = ({
  name,
  fullVocation,
  level,
  selected,
  displayedInRow,
  isCharacter,
  isLookingForParty,
  ...rest
}) => {
  const intl = useIntl()
  return (
    <ColumnContainer
      selected={selected}
      displayedInRow={displayedInRow}
      isCharacter={isCharacter}
      isLookingForParty={isLookingForParty}
      data-tip={
        (isLookingForParty || null) &&
        intl.formatMessage({ id: 'party.composer.table.lookingForParty.popup' })
      }
      {...rest}
    >
      <RowContainer>
        <PlayerDataContainer>
          <PlayerName>{name}</PlayerName>
          <Breadcrumbs>
            {isLookingForParty && <Emoji symbol="🏅" />}
            {level} {mapVocation(fullVocation)}
            {isLookingForParty && <Emoji symbol="🏅" />}
          </Breadcrumbs>
        </PlayerDataContainer>
      </RowContainer>
    </ColumnContainer>
  )
}

PlayerBadge.defaultProps = {
  selected: false,
  isLookingForParty: false,
  isCharacter: false,
  displayedInRow: false,
}

PlayerBadge.propTypes = {
  name: PropTypes.string.isRequired,
  fullVocation: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  displayedInRow: PropTypes.bool.isRequired,
  isCharacter: PropTypes.bool.isRequired,
  isLookingForParty: PropTypes.bool.isRequired,
}
