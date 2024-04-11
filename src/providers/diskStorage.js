const fs = require('fs') //para manipular arquivos.
const path = require('path')
const uploadConfig = require('../configs/upload')

class DiskStorage {
    async saveFile(file) {
        await fs.promises.rename( //não vai renomear nome, vai trocar os arquivos de pasta.
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        )

        return file
    }

    async deleteFile(file) {
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file) //buscando arquivo para deletar.

        try { //vai verificar o status do arquivo, se ele existe ou tem algum problema
            await fs.promises.stat(filePath)
        } catch { //se houver algum erro vai retornar.
            return
        }

        await fs.promises.unlink(filePath) //vai deletar o arquivo.
    }
}

module.exports = DiskStorage
