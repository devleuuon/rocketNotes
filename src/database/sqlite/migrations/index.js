const sqliteConnection = require('../../sqlite')
const createUsers = require('./createUsers')

async function migrationsRun() {
    const schemas = [createUsers].join('') //vai pegar a tabela e juntar os dados.

    sqliteConnection().then(db => db.exec(schemas)) //vai pegar a conexão então db vai executar o schemas.
    .catch(error => console.error(error)) // se der algum erro vai mostrar aqui.
}

module.exports = migrationsRun