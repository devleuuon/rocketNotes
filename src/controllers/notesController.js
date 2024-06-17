const knex = require('../database/knex')

class NotesController { //TEM QUE IR ADICIONANDO OS MÉTODOS NO NOTES.ROUTES
    async create(request, response) { //CRIAR NOTA
        const { title, description, tags, links } = request.body
        const user_id  = request.user.id

        const [note_id] = await knex('notes').insert({
            title,
            description,
            user_id
        })

        const linksInsert = links.map(link => { //map -> vai percorrer cada link q tem.
            return {
                note_id,
                url: link
            }
        })

        await knex('links').insert(linksInsert)

        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            }
        })

        await knex('tags').insert(tagsInsert)

        return response.json()
    }

    async show(request, response) { //MOSTRAR UMA NOTA SÓ
        const { id } = request.params

        const note = await knex('notes').where({ id }).first()
        const tags = await knex('tags').where({ note_id: note.id }).orderBy('name')
        const links = await knex('links').where({ note_id: note.id }).orderBy('created_at')

        return response.json({
            ...note,
            tags,
            links
        })
    }

    async delete(request, response) { //APAGAR NOTA
        const { id } = request.params

        await knex('notes').where({ id }).delete()

        return response.json()
    }

    async index(request, response) { //LISTAR TODAS AS NOTAS E PARA PESQUISAR AS NOTAS
        const { title, tags } = request.query //o query para utiliza-lo tem que ir no insomnia "QUERY" e add "name" -> user_id e o "value é o id do usuário."
        
        const user_id = request.user.id

        let notes

        if(tags){
            const filterTags = tags.split(',').map(tag => tag.trim())  //split vai converter texto em um array e vai separar por vírgulas. map -> só vai pegar a tag.

            notes = await knex('tags')
            .select([ //selecionando os campos de tabelas que serão juntados
                'notes.id', //nome da tabela.nome do campo
                'notes.title',
                'notes.user_id',
            ])
            .where('notes.user_id', user_id) //nome das tags do usuário. user_id é oq está na linha 59.
            .whereLike('notes.title', `%${title}%`) //notes.title é o nome da tabela
            .whereIn('name', filterTags) //whereIn vai comparar se o nome é o mesmo do array criado.
            .innerJoin('notes', 'notes.id', 'tags.note_id') //'tabela'. 'campo p conectar'. 'campo em comum no tags'.
            .groupBy('notes.id')//não vai repetir o nome da notas.
            .orderBy('notes.title')

        } else {
         notes = await knex('notes')
        .where({ user_id })
        .whereLike('title', `%${title}%`) //WHERELIKE AJUDA A PESQUISAR VALORES COM UMA PALAVRA. 'CAMPO QUE VAI SER REALIZADO A CONSULTA'. %PESQUISA SE HÁ A PALAVRA PARA A BUSCA%
        .orderBy('title')
        }

        const userTags = await knex('tags').where({ user_id }) //vai fazer um filtro com todas as tags onde elas são iguais ao user_id
        const notesWithTags = notes.map(note => { //vai pegar as notas e percorrer
            const noteTags = userTags.filter(tag => tag.note_id === note.id) //vai filtrar onde
        
        return {
            ...note,
            tags: noteTags
        }

        }) 
        return response.json(notesWithTags)
    }
}

module.exports = NotesController