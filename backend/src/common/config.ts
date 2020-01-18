import dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })

const config = {
  TIBIADATA_URL: process.env.TIBIADATA_URL || 'https://api.tibiadata.com/v2',
  REST_API_PORT: process.env.REST_API_PORT || 8080,
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
