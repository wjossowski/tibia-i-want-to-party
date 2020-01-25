import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FormattedMessage, useIntl } from 'react-intl'
import { PlayerBadge } from '../PlayerBadge/PlayerBadge'
import { Breadcrumbs } from '../../atoms/Breadcrumbs/Breadcrumbs'
import { calculateExpBoost } from '../../../util/experience'
import { success } from '../../../notifications/notifications'

const Container = styled.div`
  width: 80%;
  margin: 3rem;
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
  selectedPlayers,
  character,
  minLevel,
  maxLevel,
}) => {
  const { formatMessage } = useIntl()
  return (
    <Container>
      <h2>
        <FormattedMessage
          id="party.composer.party.selection.title"
          values={{
            expBoost: calculateExpBoost(selectedPlayers, character.vocation),
          }}
        />
      </h2>
      <h5>
        <FormattedMessage
          id="party.composer.party.selection.levelRange"
          values={{ minLevel, maxLevel }}
        />
      </h5>
      <PartyMembersContainer>
        <PlayerBadge
          selected={true}
          displayedInRow={true}
          isCharacter={true}
          {...character}
        />
        {selectedPlayers.map((player, i) => (
          <CopyToClipboard
            text={player.name}
            onCopy={() =>
              success(
                formatMessage(
                  { id: 'party.composer.notifications.nickCopied' },
                  {
                    nick: player.name,
                  },
                ),
              )
            }
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
        <FormattedMessage id="party.composer.party.selection.breadcrumbs" />
      </Breadcrumbs>
    </Container>
  )
}

PartySelection.propTypes = {
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
}
