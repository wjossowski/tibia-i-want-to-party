import React from 'react'
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { enMessages } from '../../translations/en'
import { plMessages } from '../../translations/pl'
import { store } from '../../App'
import { changeLanguage } from '../../redux/actions/languageActions'

const messages = {
  pl: plMessages,
  en: enMessages,
}

const TranslationProviderUnwrapped = ({ language, children }) => {
  return (
    <IntlProvider
      key={language}
      locale={language}
      messages={messages[language]}
      onError={(error) => {
        store.dispatch(changeLanguage('en'))
      }}
    >
      {children}
    </IntlProvider>
  )
}

export const TranslationProvider = connect(
  (state) => ({
    language: state.language,
  }),
  null,
)(TranslationProviderUnwrapped)
