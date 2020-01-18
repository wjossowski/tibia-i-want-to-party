import React from 'react'
import './App.css'
import 'react-notifications/lib/notifications.css'
import { Router } from './router/Router'
import { NotificationContainer } from 'react-notifications'

function App() {
  return (
    <div className="App">
      <Router />
      <NotificationContainer />
    </div>
  )
}

export default App
