const knex = require('../database/knex') //conexão com o banco de dados
const AppError = require('../utils/appError') // mostrar os erros
const { compare } = require('bcryptjs') // vai comparar senhas criptografadas
const authConfig = require('../configs/auth')
const { sign } = require('jsonwebtoken')

class SessionsController {
    async create(request, response) {
        const { email, password } = request.body

        const user = await knex('users').where({ email }).first()  //vai buscar no banco de dados se o email existe.

        if(!user) {
            throw new AppError('E-mail e/ou senha incorreta', 401)
        }

        const passwordMatched = await compare(password, user.password) // vai comparar se senha digitada confere com a sehha que está no banco de dados.

        if(!passwordMatched) {
            throw new AppError('E-mail e/ou senha incorreta', 401)
        }

        const { secret, expiresIn } = authConfig.jwt
        const token = sign({}, secret, {
            subject: String(user.id), //subject é o conteúdo que vai ser inserido dentro do token.
            expiresIn
        })



        return response.json({ user, token })
    }
}

module.exports = SessionsController;