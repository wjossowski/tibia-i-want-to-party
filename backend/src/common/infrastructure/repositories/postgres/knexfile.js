module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 54321,
      user: 'postgres',
      password: 'postgres',
      database: 'tibia_tools',
    },
  },
  production: { client: 'pg', connection: process.env.POSTGRES_DATABASE_URL },
}
