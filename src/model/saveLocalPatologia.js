import { db } from './localDb'
import { API_URL } from './config'

// Função para criar a tabela 
export function createTable(){
    db.transaction((transaction) => {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS " + 
        "localSavedPatologias " +
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, nomePatologia TEXT, descricaoDoenca TEXT, sinaisClinicos TEXT, lesoesMacroscopicas TEXT, lesoesMicroscopicas TEXT, referenciasBibliograficas TEXT);")
    })
}

// This is to get all items from the table localSavedPatologias
export async function getAllLocalPatologias(){
    return new Promise((resolve) => {
      db.transaction((transaction) => {
        transaction.executeSql("SELECT * FROM localSavedPatologias;", [], (transaction, results) => {
          resolve(results.rows._array)
        })
      })
    })
}

export async function getAllLocalPatologiasNames(){
    return new Promise((resolve) => {
      db.transaction((transaction) => {
        transaction.executeSql("SELECT namePatologia FROM localSavedPatologias;", [], (transaction, results) => {
          resolve(results.rows._array)
        })
      })
    })
}

// Para deletar essa tabela utilize a função abaixo (PERIGO IRREVERSÍVEL)
export function dropTable(){
  db.transaction((transaction) => {
      transaction.executeSql("DROP TABLE localSavedPatologias;")
  })
  console.log("Dropped table!");
}

export async function savePatologia(listaDetalhesPatologia){
      createTable();
      return new Promise((resolve) => {
        db.transaction((transaction) => {
        transaction.executeSql("INSERT INTO localSavedPatologias (nomePatologia, descricaoDoenca, sinaisClinicos, lesoesMacroscopicas, lesoesMicroscopicas, referenciasBibliograficas) VALUES (?, ?, ?, ?, ?, ?);", 
        [listaDetalhesPatologia.nomePatologia, listaDetalhesPatologia.descricaoDoenca, listaDetalhesPatologia.sinaisClinicos, listaDetalhesPatologia.lesoesMicroscopicas, listaDetalhesPatologia.lesoesMacroscopicas, listaDetalhesPatologia.referenciasBibliograficas], () => {
            resolve("Patologia salvada localmente com sucesso!")
        })
        }, (error)=>{console.log(error)})
      })
}

export async function fetchLocalPatologia(nomePatologia){
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("SELECT * FROM localSavedPatologias WHERE nomePatologia=(?);", [nomePatologia.nomePatologia], (transaction, results) => {
        resolve(results.rows._array[0])
      })
    })
  })
}