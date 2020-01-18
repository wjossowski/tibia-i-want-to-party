import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border: 1px solid black;
`

const Title = styled.div`
  border-bottom: 1px solid black;
  font-size: 1.75rem;
  padding: 0.5em;
`

const adjustTitleText = ([firstLetter, ...rest]) =>
  [firstLetter.toUpperCase(), ...rest].join('')

export const VocationColumn = ({ title, children }) => (
  <Container>
    <Title>{adjustTitleText(title)}</Title>
    {children}
  </Container>
)
