import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.join(__dirname, `.env.${process.env.NODE_ENV || 'development'}`),
})

const config = {
  TIBIADATA_URL: process.env.TIBIADATA_URL || 'https://api.tibiadata.com/v2',
  PORT: process.env.PORT || 8080,
  REDIS_URL: process.env.REDIS_URL || '',
  PARTY_SEARCH_TIMEOUT: process.env.PARTY_SEARCH_TIMEOUT || 3600,
}

if (process.env.NODE_ENV === 'production') {
  config['POSTGRES_DATABASE_URL'] = process.env.POSTGRES_DATABASE_URL
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
