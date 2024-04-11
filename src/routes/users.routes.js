//todas as rotas vão ser aqui

const { Router } = require('express') //importa do 'express'
const UsersController = require('../controllers/usersController.js') //importando controller para quando a rota for chamada.
const ensureAuthenticated = require('../middlewares/ensureAuthenticated.js')
const multer = require('multer')
const uploadConfig = require('../configs/upload.js')

const usersRoutes = Router() //inicia projeto
const upload = multer(uploadConfig.MULTER)

// function myMiddleware(request, response, next) { //middleware é o segurança, consegue acessar a requisição antes de chegar no controlador.
//     console.log('você passou pelo middleware');

//     if(!request.body.isAdmin) {
//         return response.json({ message: 'user unauthorized'})
//     }

//     next() //necessário para o middleware, chama a próxima função.
// }


const userController = new UsersController()

usersRoutes.post('/', userController.create) //QUERY PARAMS não é obrigatório passar parâmetros ao href
usersRoutes.put('/', ensureAuthenticated, userController.update) //sem o middleware que é o ensureAuthenticated, tem que passar como parametro o '/:id'. com ele pode passar vazio '/' , pois já foi passado o id na funcção ensuremiddleware.
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), (request, response) => {
    console.log(request.file.filename);
    response.json()
}) //patch é para atualizar um campo especifico. put é para atualizar mais de um campo. o single é pq vai ser carregado um arquivo só.


module.exports = usersRoutes //exportando o código