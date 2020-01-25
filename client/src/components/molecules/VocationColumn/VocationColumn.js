import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

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

export const VocationColumn = ({ title, isCharacterVocation, children }) => (
  <Container isCharacterVocation={isCharacterVocation}>
    <Title>
      <FormattedMessage id={`party.composer.table.header.${title}`} />
    </Title>
    {children}
  </Container>
)

VocationColumn.propTypes = {
  title: PropTypes.string.isRequired,
  isCharacterVocation: PropTypes.bool.isRequired,
}
