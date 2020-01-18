import React from 'react'
import styled from 'styled-components'
import { Breadcrumbs } from '../../atoms/Breadcrumbs/Breadcrumbs'
import { PlayerName } from '../../atoms/PlayerName/PlayerName'

const Container = styled.div`
  border-bottom: 1px solid black;
  justify-content: center;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  display: flex;
  background-color: ${({ selected }) => (selected ? 'green' : 'transparent')};
`

const PlayerDataContainer = styled.div``

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
  ...rest
}) => (
  <Container selected={selected} {...rest}>
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
