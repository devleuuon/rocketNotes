//index.js vai reunir todas as rotas da aplicação

const { Router } = require('express') //importanto rouer do express

const usersRouter = require('./users.routes') //importando usersRouter
const notesRouter = require('./notes.routes') //importando 
const tagsRouter = require('./tags.routes') //importando 
const sessionsRouter = require('./sessions.routes')

const routes = Router()

routes.use('/users', usersRouter) //quando acessar o '/users vai ser redirecionado para o usersRouter
routes.use('/notes', notesRouter) 
routes.use('/tags', tagsRouter) 
routes.use('/sessions', sessionsRouter) 

module.exports = routes //exportando routes