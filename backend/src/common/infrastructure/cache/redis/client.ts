import redis from 'ioredis'
import config from '@common/config'

export let client: redis.Redis

export interface Connection {
  client: redis.Redis
}

export const connect = async (): Promise<Connection> => {
  client = new redis(config.REDIS_URL)
  console.log('Starting Redis cache')

  client.on('error', (err) => {
    console.error('Error ' + err)
  })

  return {
    client,
  }
}
