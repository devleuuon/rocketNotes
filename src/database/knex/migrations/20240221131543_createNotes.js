
exports.up = knex => knex.schema.createTable('notes', table => {
    table.increments('id') //criando elementos na tabela
    table.text('title')
    table.text('description')
    table.integer('user_id').references('id').inTable('users') //cria um campo do tipo inteiro para 'user_id' e faz uma referência para o id uqe existe na tabela 'users'

    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable('notes')