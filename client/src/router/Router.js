import React from 'react'

import { Onboarding } from '../scenes/Onboarding'
import { PlayersList } from '../scenes/PlayersList'
import { paths } from './paths'

import { Router as ReactRouter, Route, Switch } from 'react-router-dom'

import { createBrowserHistory } from 'history'

export const Router = () => (
  <ReactRouter history={createBrowserHistory()}>
    <Switch>
      <Route
        exact
        path={`${paths.party}/:characterName`}
        component={PlayersList}
      />
      <Route component={Onboarding} />
    </Switch>
  </ReactRouter>
)
