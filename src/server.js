//estrutura inicial do projeto
//src/server.js/routes/controllers/utils/database/sqlite/migrations.
//server.js -> ponto de entrada
//routes -> rotas da aplicação
//middleware -> verifica  requisição antes de ir para o controllers
//controllers -> vai executar a requisição e devolve para routes a informação
require('express-async-errors') //importando biblioteca de erros. "npm install express-async-errors --save"
const migrationsRun = require('./database/sqlite/migrations')
const express = require('express') //pegando o conteúdo da pasta express no node_modules;
const appError = require('./utils/appError.js') //importando
const uploadConfig = require('./configs/upload.js')

const routes = require('./routes') //importando routes

migrationsRun() //executa banco de dados


const app = express() // chamando para iniciar a aplicação.
app.use(express.json()) // passando para o vscode que no insomnia vai tratar com json.

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER)) //vai mostrar imagem no insomnia.

app.use(routes) //rodando routes


app.use((error, request, response, next) => {
    if(error instanceof appError) { //verifica se o erro vem do cliente.
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }
    
    return response.status(500).json({ //verifica se erro é do servidor
        status: 'error',
        message: "Internal server error"
    })
})

const PORT = 3333 // o express vai atender o port. localhost:3333

app.listen(PORT, () => { //app escuta o PORT e executa a função.
    console.log(`server is running on PORT ${PORT}`)
})

//LÓGICA
//quando clicar no send ele vem no server.js e pega o "app.use(routes)",
//ele vai pegar o routes.use na pasta index.js e acessar o usersRouter na pasta "users.routes.js"
//então vai criar o controller e devolver para usersRouter e então devolve para o cliente.