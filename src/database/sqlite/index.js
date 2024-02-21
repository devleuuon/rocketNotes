const sqlite3 = require('sqlite3') //driver
const sqlite = require('sqlite') // que vai fazer a conexão
const path = require('path') // vai resolver o problema no diretório do arquivo, filename.

async function sqliteConnection() {
    const database = await sqlite.open({ //vai abrir conexão
        filename: path.resolve(__dirname, '.', 'database.db'), //filename é o onde o arquivo vai ficar salvo. database.db vai ser criado quando chamar função no server.js
        driver: sqlite3.Database //dirname é onde o projeto está, "volta atrás nas pastas" e acessa a pasta database
    })

    return database
}

module.exports = sqliteConnection

//SGBD -> Sistema gerenciador de banco de dados