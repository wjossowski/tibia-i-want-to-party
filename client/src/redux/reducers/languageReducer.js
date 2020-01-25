import { LANGUAGE_CHANGED } from '../actions/constants'

const setLocale = (locale) => {
  if (window.localStorage) {
    window.localStorage.setItem('tibia-party-compose-intl-locale', locale)
  }
}

const getLocale = () => {
  if (window.localStorage) {
    try {
      return window.localStorage.getItem('tibia-party-compose-intl-locale')
    } catch (err) {
      return
    }
  }
}

const defaultState = getLocale() || 'en'

export const langReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LANGUAGE_CHANGED:
      setLocale(action.language)
      return action.language
    default:
      return state
  }
}
