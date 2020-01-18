exports.up = function(knex) {
  return knex.schema.createTable('characters', (table) => {
    table.increments()
    table.string('name')
    table.unique('name')
    table
      .timestamp('timestamp')
      .notNullable()
      .defaultTo(knex.fn.now())
    table.integer('userId')
    table
      .foreign('userId')
      .references('id')
      .inTable('users')
    table.index(['name'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('characters')
}
