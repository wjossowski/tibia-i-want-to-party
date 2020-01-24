import React from 'react'

import { Onboarding } from '../scenes/Onboarding'
import { PartyComposer } from '../scenes/PartyComposer'
import { paths } from './paths'

import { Router as ReactRouter, Route, Switch } from 'react-router-dom'

import { createBrowserHistory } from 'history'

export const Router = () => (
  <ReactRouter history={createBrowserHistory()}>
    <Switch>
      <Route
        exact
        path={`${paths.party}/:characterName`}
        component={PartyComposer}
      />
      <Route component={Onboarding} />
    </Switch>
  </ReactRouter>
)
