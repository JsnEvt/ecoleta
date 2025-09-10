// importar a dependência do sqlite3
const sqlite3 = require('sqlite3').verbose()

// iniciar o objeto que irá fazer as operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

// criar a tabela se não existir
// db.run(`
//   CREATE TABLE IF NOT EXISTS places (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       image TEXT, 
//       name TEXT,
//       address TEXT,
//       address2 TEXT,
//       state TEXT,
//       city TEXT,
//       items TEXT
//   );
// `)

// // query para inserção
// const query = `
//   INSERT INTO places (
//       image, 
//       name,
//       address,
//       address2,
//       state, 
//       city,
//       items
//   ) VALUES (?,?,?,?,?,?,?);
// `

// // valores para inserir
// const values = [
//     [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"
//     ],
//     [
//         "https://images.unsplash.com/photo-1609137144813-0a2c51c27d16?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
//         "EcoBaterias",
//         "Rua das Palmeiras, Centro",
//         "Número 102",
//         "São Paulo",
//         "Campinas",
//         "Pilhas e Baterias"
//     ],
//     [
//         "https://images.unsplash.com/photo-1581578731548-d9f89f8e8b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
//         "ReciclaPapel",
//         "Avenida Brasil, Zona Norte",
//         "Número 340",
//         "Paraná",
//         "Curitiba",
//         "Papéis e Papelões"
//     ],
//     [
//         "https://images.unsplash.com/photo-1604382354938-07f9b60d454c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
//         "E-Lixo",
//         "Rua XV de Novembro, Centro",
//         "Número 890",
//         "Minas Gerais",
//         "Belo Horizonte",
//         "Resíduos Eletrônicos"
//     ],
//     [
//         "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
//         "Coleta Verde",
//         "Rua das Flores, Bairro Industrial",
//         "Número 55",
//         "Rio Grande do Sul",
//         "Porto Alegre",
//         "Óleo de Cozinha"
//     ],
//     [
//         "https://images.unsplash.com/photo-1611307688483-94e7d80a3c43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
//         "Composta Fácil",
//         "Rua da Colina, Bairro Verde",
//         "Número 765",
//         "Bahia",
//         "Salvador",
//         "Resíduos Orgânicos"
//     ]
// ]

// função callback após cada insert
// function afterInsertData(err) {
//     if (err) {
//         return console.error("Erro ao cadastrar:", err)
//     }
//     console.log("✅ Cadastrado com sucesso. ID:", this.lastID)
// }

// executa a query para cada registro
// values.forEach(valueSet => {
//     db.run(query, valueSet, afterInsertData)
// })

// db.run(`DELETE FROM places WHERE id=?`, function(err){
//     if(err){
//         return console.log(err)
//     }
//     console.log("Registro deletado com sucesso!")
// })

// db.all(`SELECT * FROM places`, function (err, rows) {
//     if (err) {
//         return console.log(err)
//     }
//     console.log("Aqui estão os registros: ")
//     console.log(rows)
// })

// exporta o banco para ser usado em outros arquivos
module.exports = db
