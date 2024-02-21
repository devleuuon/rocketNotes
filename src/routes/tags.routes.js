//todas as rotas vão ser aqui

const { Router } = require('express') //importa do 'express'
const TagsController = require('../controllers/tagsControllers')

const tagsRoutes = Router() //inicia projeto


const tagsController = new TagsController()

tagsRoutes.get('/:user_id', tagsController.index)


module.exports = tagsRoutes //exportando o código