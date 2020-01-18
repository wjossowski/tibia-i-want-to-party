exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('facebookId')
    table.unique('facebookId')
    table
      .timestamp('timestamp')
      .notNullable()
      .defaultTo(knex.fn.now())
    table.index(['facebookId'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}
