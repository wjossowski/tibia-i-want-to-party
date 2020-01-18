import knex from 'knex'
import knexfile from './knexfile'

export let client: knex

export interface Connection {
  client: knex
  close: Promise<void>
}

export const connect = async () => {
  client = await knex(knexfile[process.env.NODE_ENV] as knex.Config)
  console.log('Connected to postgres DB')
  return {
    client,
    async close() {
      return client.destroy()
    },
  }
}
