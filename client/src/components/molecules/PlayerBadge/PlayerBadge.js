import React from 'react'
import styled from 'styled-components'
import { Breadcrumbs } from '../../atoms/Breadcrumbs/Breadcrumbs'
import { PlayerName } from '../../atoms/PlayerName/PlayerName'

const Container = styled.span`
  border-bottom: 1px solid black;
  justify-content: center;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  display: flex;
  background-color: ${({ selected, isCharacter }) =>
    isCharacter ? '#9A7D32' : selected ? 'green' : 'transparent'};
  border-left: ${({ displayedInRow }) =>
    displayedInRow ? '1px solid black' : '0'};
  border-right: ${({ displayedInRow }) =>
    displayedInRow ? '1px solid black' : '0'};
  margin: ${({ displayedInRow }) => (displayedInRow ? '0.25rem' : '0')};
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
  ...rest
}) => (
  <Container
    selected={selected}
    displayedInRow={displayedInRow}
    isCharacter={isCharacter}
    {...rest}
  >
    <PlayerDataContainer>
      <PlayerName>{name}</PlayerName>
      <Breadcrumbs>
        {level} {mapVocation(fullVocation)}
      </Breadcrumbs>
    </PlayerDataContainer>
  </Container>
)

PlayerBadge.defaultProps = {
  selected: false,
}
