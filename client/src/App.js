import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './redux/store'
import { TranslationProvider } from './providers/TranslationProvider/TranslationProvider'
import './App.css'
import 'react-notifications/lib/notifications.css'
import { Router } from './router/Router'
import { NotificationContainer } from 'react-notifications'
import ForkMeOnGithub from 'fork-me-on-github'
import { TopBar } from './layout/TopBar/TopBar'

export const store = configureStore()

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <TranslationProvider>
          <TopBar />
          <Router />
          <NotificationContainer />
          <ForkMeOnGithub
            repo="https://github.com/mojtekossowski/tibia-i-want-to-party"
            text="View source on GitHub"
            side="left"
          />
        </TranslationProvider>
      </Provider>
    </div>
  )
}

export default App
