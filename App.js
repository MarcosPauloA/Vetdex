import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet} from 'react-native';

// Importando componentes para navegação entre telas
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/viewScreens/Login/Login.js'
import HomeScreen from './src/viewScreens/Home/Home.js'
import Patologias from './src/viewScreens/Patologias/Patologias.js'
import DetalhesDaPatologia from './src/viewScreens/DetalhesDaPatologia/DetalhesDaPatologia.js'
import FullScreenImage from './src/viewScreens/components/FullScreenImage.js'
import Model3DScreen from './src/viewScreens/DetalhesDaPatologia/Model3DScreen.js';
// Criando uma navegação em Stack
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={estilos.container}>
      <StatusBar />
      <NavigationContainer initialRouteName="Home">
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Patologias" component={Patologias} />
          <Stack.Screen name="DetalhesDaPatologia" component={DetalhesDaPatologia} />
          <Stack.Screen name="FullScreenImage" component={FullScreenImage} />
          <Stack.Screen name="Model3DScreen" component={Model3DScreen} />
        </Stack.Navigator>
      </NavigationContainer>
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
