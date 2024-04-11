const path = require('path')
const multer = require('multer') // para fzer o upload
const crypto = require('crypto') // vai gerar um hash de forma aleatória, criando diferentes nomes para os rquivos, evitando de um arquivo sobrepor outro com o mesmo nome.

const TMP_FOLDER = path.resolve(__dirname, '..', '..', 'tpm')
const UPLOADS_FOLDER = path.resolve(__dirname, 'uploads')

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex') //criaando nome aleatório em string e hexadecimal.
            const fileName = `${fileHash}-${file.originalname}` //hash + nome do arquivo original.

            return callback(null, fileName)
        }
    })
}

module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER
}