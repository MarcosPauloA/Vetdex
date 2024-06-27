// Arquivo que abre a conexão com o banco de dados local
import * as SQLite from 'expo-sqlite'

function openDb(){
    try{
        const database = SQLite.openDatabase('localDb.db');
        return database;
    } catch {
        console.log("Failed opening local database");
    }
}

 export const db = openDb();