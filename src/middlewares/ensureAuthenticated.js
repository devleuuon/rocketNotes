const { verify } = from ('jsonwebtoken')
const AppError = require('../utils/appError')
const authConfig = require('../configs/auth')

function ensureAuthenticated(request, response, next) { //middleware tem que ter a funcção next.
    const authHeader = request.headers.authorization

    if(!authHeader) {
        throw new AppError('JWT Token não informado!', 401)
    }

    const [, token] = authHeader.split(' ') // vai pegar somente o token e colocá-lo em um vetor, separando eles por um espaço vazio.

    try {
        const { sub: user_id } = verify(token, authConfig.jwt.secret) // vai verificar se o token é igual e se for, vai converter o subject em user_id. subject é o conteúdo do token, que foi passado no arquivo sessionsController.
        
        request.user = { //da mesma maneira que foi convertido para string o subject, agora o user_id vai ser tornar um número.
            id: Number(user_id),
        }

        return next() // se tudo der certo, vai retornar a função next, p chamar a próxima função.
    } catch {
        throw new AppError('JWT Token inválido!', 401)
    }
}

module.exports = ensureAuthenticated