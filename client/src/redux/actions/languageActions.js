import { LANGUAGE_CHANGED } from './constants'

export const changeLanguage = (language) => ({
  type: LANGUAGE_CHANGED,
  language,
})
