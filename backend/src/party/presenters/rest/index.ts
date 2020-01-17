import path from 'path'
import http from 'http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import config from '../../../common/config'
import { apiV1 } from './controllers/v1'
import { HttpError } from 'backend/src/common/applicationErrors'

const logger = morgan('combined')

const app = express()
app.use(logger)
app.use(cors())

app.use(express.static(path.join(__dirname, './client/build')))

app.use('/api/v1', apiV1)
app.use((err, _req, res, _next) => {
  let errorMessage = 'An error occured'
  if (err instanceof HttpError) {
    errorMessage = err.message
  }
  res.status(err.status || 500).json({
    error: errorMessage,
  })
})

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

app.all('/*', (_req, res) => {
  res.status(404).send({
    status: 404,
    statusText: 'No route matches.',
  })
})

const server = new http.Server(app)
server.listen(config.REST_API_PORT)

console.info(`Starting server at ${config.REST_API_PORT}`)
