import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import Login from './src/viewScreens/Login/Login.js'
import HomeScreen from './src/viewScreens/Home/Home.js'
import Patologias from './src/viewScreens/Patologias/Patologias.js'
import DetalhesDaPatologia from './src/viewScreens/DetalhesDaPatologia/DetalhesDaPatologia.js'



export default function App() {
  return (
    <SafeAreaView style={estilos.container}>
      <StatusBar />
      {/*<Login />*/}
      {/*<HomeScreen />*/}
      {/*<Patologias/>*/}
      <DetalhesDaPatologia/>
    </SafeAreaView>
  );
}
 

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    // Cor de fundo do app
    //backgroundColor: '#0E21A0',
  },
 
});
