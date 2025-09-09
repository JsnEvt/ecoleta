//importar a dependencia do sqlite3
//verbose() = para ver as mensagens no terminal.

const sqlite3 = require('sqlite3').verbose()

//iniciar o objeto que ira fazer as operacoes no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

//utlizar o objeto de banco de dados para as nossas operacoes.
//serialize() = rodar uma sequencia de codigos.
// db.serialize(() => {
//     //criar uma tabela com comandos SQL.

//     db.run(`
//     CREATE TABLE IF NOT EXISTS places (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         image TEXT, 
//         name TEXT,
//         address TEXT,
//         address2 TEXT,
//         state TEXT,
//         city TEXT,
//         items TEXT
//     );
//   `)

//     //Inserir dados da tabela

//     const query = `
//     INSERT INTO places (
//         image, 
//         name,
//         address,
//         address2,
//         state, 
//         city,
//         items
//     ) VALUES (?,?,?,?,?,?,?);`

//     const values = [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHJlY3ljbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
//         "Papersider",
//         "Guilherme Gemballa, Jardim America",
//         "Numero 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"

//     ]

//     function afterInsertData(err) {
//         if (err) {
//             return console.log(err)
//         }
//         console.log("Cadastrado com sucesso.")
//         console.log(this)

//     }

//     // db.run(query, values, afterInsertData)



//     //Consultar dados da tabela

    // db.all(`SELECT * FROM places`, function (err, rows) {
    //     if (err) {
    //         return console.log(err)
    //     } else {
    //         console.log("Aqui estao seus registros:")
    //         console.log(rows)
    //     }

    // })
// })


    //Deletar dados.

    // db.run(`DELETE FROM places WHERE id = ?`, [1], function (err) {
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log("Registro deletado com sucesso!")
    // })

module.exports = db