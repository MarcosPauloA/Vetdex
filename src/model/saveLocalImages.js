// Arquivo de salvamento local das imagens
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack'
import { db } from './localDb'
import * as FileSystem from 'expo-file-system'
export function createTable(){
    db.transaction((transaction) => {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS " +
        "localSavedImages " +
        "(idNomePatologia TEXT UNIQUE, images TEXT);")
    }, (error)=>{console.log(error)})
}

// Para deletar essa tabela utilize a função abaixo (PERIGO IRREVERSÍVEL)
export async function dropImageTable(){
    db.transaction((transaction) => {
        transaction.executeSql("DROP TABLE IF EXISTS localSavedImages;")
    }, (error)=>{console.log(error)})
    console.log("Dropped table!");
}

// This is to get all items from the table localSavedImages
export async function getAllLocalImages(idNomePatologia){
    return new Promise((resolve) => {
      db.transaction((transaction) => {
        transaction.executeSql("SELECT images FROM localSavedImages WHERE idNomePatologia=(?);", [idNomePatologia], (transaction, results) => {
          resolve(results.rows._array)
        })
      }, (error)=>{console.log(error)})
    })
  }

export async function saveImages(idNomePatologia, images) {
  for (let key in images){
      const imageUrl = images[key].image;
      const localUri = FileSystem.documentDirectory + images[key].title + ".jpg";
      // Download the image 
      const downloadResumable = FileSystem.createDownloadResumable(
        imageUrl,
        localUri,
        {}
      );
      images[key].image = localUri;
      try {
        const { uri } = await downloadResumable.downloadAsync();
        console.log('Finished downloading to ', uri);
      } catch (e) {
        console.error(e);
      }
      
    }
    createTable();
    return new Promise((resolve) => {
        db.transaction((transaction) => {
        transaction.executeSql("INSERT INTO localSavedImages (idNomePatologia, images) VALUES (?, ?);", [idNomePatologia, JSON.stringify(images)], () => {
            resolve("Imagens salvadas localmente com sucesso!")
        })
        }, (error)=>{console.log(error)})
    })

}