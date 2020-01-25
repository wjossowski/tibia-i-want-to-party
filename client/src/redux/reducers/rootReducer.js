import { combineReducers } from 'redux'
import { langReducer } from './languageReducer'

export default combineReducers({
  language: langReducer,
})
