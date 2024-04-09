const knex = require('../database/knex')
const AppError = require('../utils/appError')

class SessionsController {
    async create(request, response) {
        const { email, password } = request.body

        const user = await knex('users').where({ email }).first()  //vai buscar no banco de dados se o email existe.

        if(!user) {
            throw new AppError('E-mail e/ou senha incorreta', 401)
        }

        return response.json({ user })
    }
}

module.exports = SessionsController;