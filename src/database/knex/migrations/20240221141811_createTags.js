
exports.up = knex => knex.schema.createTable('tags', table => {
    table.increments('id') //criando elementos na tabela
    table.text('name').notNullable() //não aceita valor nulo

    table.integer('note_id').references('id').inTable('notes').onDelete('CASCADE') //se apagar a tabela notes, o ondelete irá deletar a tag.
    table.integer('user_id').references('id').inTable('users')


})

exports.down = knex => knex.schema.dropTable('tags')