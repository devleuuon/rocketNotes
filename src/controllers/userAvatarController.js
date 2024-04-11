const knex = require('../database/knex')
const AppError = require('../utils/appError')
const DiskStorage = require('../providers/diskStorage')

class UserAvatarController {
    async update(request, response) {
        const user_id = request.user.id
        const avatarFileName = request.file.filename

        const diskStorage = new DiskStorage()

        const user = await knex('users')
        .where({ id: user_id }).first()

        if(!user) { //se usuário não estiver logado
            throw new AppError('Somente usuários autenticados podem mudar avatar!', 401)
        }

        if(user.avatar) { //se existir foto, vai apagar
            await diskStorage.deleteFile(user.avatar)
        }

        const filename = await diskStorage.saveFile(avatarFileName) //vai salvar nova imagem
        user.avatar = filename

        await knex('users').update(user).where({ id: user_id }) // atualizar no banco de dados 

        return response.json(user)
    }
}

module.exports = UserAvatarController