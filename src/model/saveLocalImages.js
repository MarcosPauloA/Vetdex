import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack'
import { db } from './localDb'

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
    console.log(images);
    for (let i = 0; i < images.length(); i++){
      const imageUrl = images[i].image;
      console.log(imageUrl);
      // Download the image 
      /*
      const callback = downloadProgress => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        this.setState({
          downloadProgress: progress,
        });
      };
      
      const downloadResumable = FileSystem.createDownloadResumable(
        'http://techslides.com/demos/sample-videos/small.mp4',
        FileSystem.documentDirectory + 'small.mp4',
        {},
        callback
      );
      
      try {
        const { uri } = await downloadResumable.downloadAsync();
        console.log('Finished downloading to ', uri);
      } catch (e) {
        console.error(e);
      }
      
      try {
        await downloadResumable.pauseAsync();
        console.log('Paused download operation, saving for future retrieval');
        AsyncStorage.setItem('pausedDownload', JSON.stringify(downloadResumable.savable()));
      } catch (e) {
        console.error(e);
      }
      
      try {
        const { uri } = await downloadResumable.resumeAsync();
        console.log('Finished downloading to ', uri);
      } catch (e) {
        console.error(e);
      }
      
      //To resume a download across app restarts, assuming the DownloadResumable.savable() object was stored:
      const downloadSnapshotJson = await AsyncStorage.getItem('pausedDownload');
      const downloadSnapshot = JSON.parse(downloadSnapshotJson);
      const downloadResumable = new FileSystem.DownloadResumable(
        downloadSnapshot.url,
        downloadSnapshot.fileUri,
        downloadSnapshot.options,
        callback,
        downloadSnapshot.resumeData
      );
      
      try {
        const { uri } = await downloadResumable.resumeAsync();
        console.log('Finished downloading to ', uri);
      } catch (e) {
        console.error(e);
      }
      */

    }
    createTable();
    return new Promise((resolve) => {
        db.transaction((transaction) => {
        transaction.executeSql("INSERT INTO localSavedImages (idNomePatologia, images) VALUES (?, ?);", [idNomePatologia, images], () => {
            resolve("Imagens salvadas localmente com sucesso!")
        })
        }, (error)=>{console.log(error)})
    })
  
}