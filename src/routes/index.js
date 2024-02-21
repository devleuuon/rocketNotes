//index.js vai reunir todas as rotas da aplicação

const { Router } = require('express') //importanto rouer do express

const usersRouter = require('./users.routes') //importando usersRouter
const notesRouter = require('./notes.routes') //importando usersRouter
const tagsRouter = require('./tags.routes') //importando usersRouter

const routes = Router()

routes.use('/users', usersRouter) //quando acessar o '/users vai ser redirecionado para o usersRouter
routes.use('/notes', notesRouter) //quando acessar o '/users vai ser redirecionado para o usersRouter
routes.use('/tags', tagsRouter) //quando acessar o '/users vai ser redirecionado para o usersRouter

module.exports = routes //exportando routes