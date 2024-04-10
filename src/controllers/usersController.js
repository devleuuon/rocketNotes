//o controller pode ter no máximo 5 métodos. não necessariamente precisa ter os 5.
//index - GET para listar vários registros.
//show - GET para exibir um registro específico.
//create - PUT para atualizar um registro.
//update - PUT para atualizar um registro.
//delete - DELETE para remover um registro.

//HTTPS STATUS

//102 - processando
//200 - requisição bem sucedida
//201 - criado
//301 - movido permanente
//302 - movido
//400 - bad request
//401 - unauthorized
//404 - not found
//500 - erro interno

const { hash, compare } = require('bcryptjs') //hash é criptografia da senha. compare é para comparar as senhas no bd, pq elas estão criptografadas e não da p comparar.
const appError = require('../utils/appError.js')
const sqliteConnection = require('../database/sqlite')


class UsersController { //criar class, pq na class pode ter várias funções.
    async create(request, response) {
        const { name, email, password } = request.body

        const database = await sqliteConnection() //conexão com o banco de dados
        const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)', [email]) //vai pegar no database o email e verificar se ele já existe. o (?) será substituido pelo [email]

        if(checkUserExists){
            throw new appError('Este email já está em uso!')
        }

        const hashedPassword = await hash(password, 8)

        await database.run( //insere dados dentro
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        )

        return response.status(201).json() //se o email não for igual, vai ser criado
    }

    async update(request, response) {
        const { name, email, password, old_password } = request.body
        const user_id = request.user.id

        const database = await sqliteConnection() //conexão com banco de dados
        const user = await database.get('SELECT * FROM users WHERE id = (?)', user_id)

        if(!user) {
            throw new appError('usuário não encontrado')
        }

        const userWithUpdateEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email])

        if(userWithUpdateEmail && userWithUpdateEmail.id !== user.id){
            throw new appError('Este email já está em uso')
        }

        user.name = name //vai pegar o username e passar o novo valor
        user.email = email // se não houver conteúdo no name, vai usar oque ficou no user.name

        if(password && !old_password){
            throw new appError('Você precisa informar a senha antiga para definir a nova senha')
        }

        if(password && old_password) {
            const checkOldPassword = await compare(old_password, user.password)

            if(!checkOldPassword) {
                throw new appError('A senha antiga não confere')
            }

            user.password = await hash(password, 8) //essa vai ser a senha, caso não caia no if
        }

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, user_id]
            )

            return response.json() //tem que add o método put no users.routes
    }
}

module.exports = UsersController //exportando.