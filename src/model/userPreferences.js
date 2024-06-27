// Importando banco de dados local
import { db } from "./localDb"

// Função para criar tabela
export function createTable(){
    db.transaction((transaction) => {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS " + 
        "userPreferences " +
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, tamanhoLetra INTEGER, mostraImagemSensivel TINYINT(1));")
    })
}
// Para deletar essa tabela utilize a função abaixo (PERIGO IRREVERSÍVEL)
export async function dropTable(){
    db.transaction((transaction) => {
        transaction.executeSql("DROP TABLE IF EXISTS userPreferences;")
    })
    console.log("Dropped table!");
}

// This is to get all items from the table 
export async function getUserPreferences(){
    return new Promise((resolve) => {
      db.transaction((transaction) => {
        transaction.executeSql("SELECT * FROM userPreferences;", [], (transaction, results) => {
          resolve(results.rows._array)
        })
      })
    })
  }

export async function firstUserPreference(nomeCategoriaEstudo) {

    return new Promise((resolve) => {
        db.transaction((transaction) => {
        transaction.executeSql("INSERT INTO localSavedCategoriasEstudos (nomeCategoriaEstudo) VALUES (?);", [nomeCategoriaEstudo], () => {
            resolve("CategoriaDeEstudo salvada localmente com sucesso!")
        })
        })
    })
}
