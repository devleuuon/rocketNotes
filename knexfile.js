const path = require('path') //ajuda a não quebrar o endereço no filename, caso use em diversos sistemas operacionais.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'sqlite', 'database.db')
    },

    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb)
    }, //funcionalidade para quando deletar uma nota, ele vai deletar em 'cascade' as notas

    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'knex', 'migrations')
    },

    useNullAsDefault: true
  }
}
