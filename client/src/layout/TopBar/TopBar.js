import React from 'react'
import styled from 'styled-components'
import { store } from '../../App'
import { changeLanguage } from '../../redux/actions/languageActions'
import { connect } from 'react-redux'
import { Emoji } from '../../components/atoms/Emoji/Emoji'

const Bar = styled.div`
  min-height: 3rem;
  background-color: #111;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  & > * {
    margin-right: 2rem;
  }
`

export const TopBarUnwrapped = ({ language }) => {
  return (
    <Bar>
      <span
        onClick={() => {
          store.dispatch(changeLanguage('en'))
        }}
      >
        <Emoji symbol="🇺🇸" />
      </span>
      <span
        onClick={() => {
          store.dispatch(changeLanguage('pl'))
        }}
      >
        <Emoji symbol="🇵🇱" />
      </span>
    </Bar>
  )
}

export const TopBar = connect(
  (state) => ({
    language: state.language,
  }),
  null,
)(TopBarUnwrapped)
