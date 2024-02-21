//todas as rotas vão ser aqui

const { Router } = require('express') //importa do 'express'
const NotesController = require('../controllers/notesController.js')

const notesRoutes = Router() //inicia projeto


const notesController = new NotesController()

notesRoutes.get('/', notesController.index) //como está sendo passado o nome pela query no insomnia, não precisa passar parâmetros. deixando somente '/'
notesRoutes.post('/:user_id', notesController.create) //QUERY PARAMS não é obrigatório passar parâmetros ao href
notesRoutes.get('/:id', notesController.show) //QUERY PARAMS não é obrigatório passar parâmetros ao href
notesRoutes.delete('/:id', notesController.delete) //QUERY PARAMS não é obrigatório passar parâmetros ao href


module.exports = notesRoutes //exportando o código