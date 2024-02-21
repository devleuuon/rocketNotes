
exports.up = knex => knex.schema.createTable('links', table => {
    table.increments('id') //criando elementos na tabela
    table.text('url').notNullable() //não aceita valor nulo

    table.integer('note_id').references('id').inTable('notes').onDelete('CASCADE') //se apagar a tabela notes, o ondelete irá deletar a tag.

    table.timestamp('created_at').default(knex.fn.now())

})

exports.down = knex => knex.schema.dropTable('links')