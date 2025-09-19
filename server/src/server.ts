import express from 'express';
import cors from 'cors'
import path from 'path';
import routes from './routes';
import { errors } from 'celebrate'


const app = express();

app.use(cors())
app.use(express.json())
app.use(routes)

//Rota: endereco completo da requisicao
//Recurso: qual entidade estamos acessando no sistema

// GET: buscar uma ou mais informacoes do back-end
// POST: criar uma nova informacao no back-end
// PUT: atualizar uma informacao existente no back-end
// DELETE: remover uma informacao do back-end.

//Request Param: parametros que vem na propria rota que identificam um recurso.
//Query Param: parametros opcionais / filtragens, paginacao...
//Request Body: parametros da criacao e atualizacao de informacoes.

//Usaremos o knex.js devido a versatilidade de linguagem entre varios tipos de bancos de dados SQLite, Postgres...
//Exemplo de sintaxe tradicional: SELECT * FROM users WHERE name = "Jason"
//com o knex.js ficaria assim:
//knex('users').where('name', 'Jason').select('*')

// app.get('/', (req, res) => {
//   const search = String(req.query.search);

//   //esta linha abaixo e uma consulta com os parametros do query search usando a condicao IF(resumida)
//   const filteredUsers = search ? users.filter(user => user.includes(search)): users;

//   //A query search pode retornar um array, para que isso nao aconteca nesse caso, colocamos a variavel
//   //search dentro de uma string como na linha ...

//   return res.json(filteredUsers);
// });

app.use(errors())

app.use('/uploads', express.static(path.resolve(__dirname, '../src/uploads')))
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')))

app.listen(3333, '0.0.0.0', () => {
  console.log('Server running on http://0.0.0.0:3333')
});