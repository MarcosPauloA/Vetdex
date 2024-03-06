// Importando banco de dados local
import { db } from "./localDb"

// Função para criar tabela
export function createTable(){
    db.transaction((transaction) => {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS " + 
        "localSavedCategoriasEstudos " +
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, nomeCategoriaEstudo TEXT);")
    })
}
// Para deletar essa tabela utilize a função abaixo (PERIGO IRREVERSÍVEL)
export async function dropTable(){
    db.transaction((transaction) => {
        transaction.executeSql("DROP TABLE IF EXISTS localSavedCategoriasEstudos;")
    })
    console.log("Dropped table!");
}

// This is to get all items from the table localSavedCategoriaEstudos
export async function getAllLocalCategoriasEstudos(){
    return new Promise((resolve) => {
      db.transaction((transaction) => {
        transaction.executeSql("SELECT * FROM localSavedCategoriasEstudos;", [], (transaction, results) => {
          resolve(results.rows._array)
        })
      })
    })
  }

export async function saveListaCategoriasEstudo(listaCategorias){
    for(let i = 0; i < listaCategorias.length; i++){
        if (listaCategorias[i].nomeCategoriaEstudo != undefined){
            addCategoriaEstudo(listaCategorias[i].nomeCategoriaEstudo);
        }
    }
}

export async function addCategoriaEstudo(nomeCategoriaEstudo) {

    return new Promise((resolve) => {
        db.transaction((transaction) => {
        transaction.executeSql("INSERT INTO localSavedCategoriasEstudos (nomeCategoriaEstudo) VALUES (?);", [nomeCategoriaEstudo], () => {
            resolve("CategoriaDeEstudo salvada localmente com sucesso!")
        })
        })
    })
  
}