import { apiV1 } from './controllers/v1'
import config from '../../../common/config'

import express from 'express'
import http from 'http'

const app = express()
app.use('/api/v1', apiV1)

app.use((err: any, _req, res: any) => {
  console.log('error')
  res.status(err.status || 500).json({
    message: err.message,
  })
})

app.all('/*', (_req, res) => {
  res.status(404).send({
    status: 404,
    statusText: 'No route matches.',
  })
})

const server = new http.Server(app)
server.listen(config.REST_API_PORT)
