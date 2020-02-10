import dotenv from 'dotenv'
import path from 'path'

const NODE_ENV = process.env.NODE_ENV || 'development'

dotenv.config({
  path: path.join(__dirname, `.env.${NODE_ENV}`),
})

const config = {
  TIBIADATA_URL: process.env.TIBIADATA_URL || 'https://api.tibiadata.com/v2',
  PORT: process.env.PORT || 8080,
  REDIS_URL: process.env.REDIS_URL || '',
  PARTY_SEARCH_TIMEOUT: process.env.PARTY_SEARCH_TIMEOUT || 3600,
  DEBUG: NODE_ENV === 'development',
}

export const ensureConfig = (configObj: object) => {
  Object.entries(configObj).forEach(([key, value]) => {
    if (value === '' || value === undefined) {
      throw new Error(`Environment variable ${key} is missing.`)
    }
  })
}

ensureConfig(config)

export default config
