import express from 'express'
import { party } from './party'

export const apiV1 = express.Router()

apiV1.use('/party', party)
