import React from 'react'
import './App.css'
import 'react-notifications/lib/notifications.css'
import { Router } from './router/Router'
import { NotificationContainer } from 'react-notifications'
import ForkMeOnGithub from 'fork-me-on-github'

function App() {
  return (
    <div className="App">
      <Router />
      <NotificationContainer />
      <ForkMeOnGithub
        repo="https://github.com/mojtekossowski/tibia-i-want-to-party"
        text="View source on GitHub"
        side="left"
      />
    </div>
  )
}

export default App
