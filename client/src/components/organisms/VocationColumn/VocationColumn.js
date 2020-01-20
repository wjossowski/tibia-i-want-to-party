import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border: 1px solid black;
  background-color: ${({ isCharacterVocation }) =>
    isCharacterVocation ? '#00000020' : '#ffffff10'};
  min-width: 22rem;
`

const Title = styled.div`
  border-bottom: 1px solid black;
  font-size: 2rem;
  padding: 0.5em;
`

const adjustTitleText = ([firstLetter, ...rest]) =>
  [firstLetter.toUpperCase(), ...rest, 's'].join('')

export const VocationColumn = ({ title, children, isCharacterVocation }) => (
  <Container isCharacterVocation={isCharacterVocation}>
    <Title>{adjustTitleText(title)}</Title>
    {children}
  </Container>
)
