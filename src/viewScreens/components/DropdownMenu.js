// Arquivo do componente do ícone de três pontos no canto superior direito do app
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import { saveLocally } from '../../controller/MostraDetalhesPatologia';
import { useRoute } from '@react-navigation/native';
import { GlobalContext } from './GlobalContext';

const DropdownMenu = () => {
  // Variaveis para tamanho do texto da tela e se mostra ou não as imagens, buscados do GlobalContext
  const {setTamanhoTitulo, setTamanhoParagrafo, tamanhoParagrafo, tamanhoTitulo,
    mostraImagemSensivel, setMostraImagemSensivel} = useContext(GlobalContext);
  const route = useRoute();

  // Variaveis para o <Switch>
  const [isEnabled, setIsEnabled] = useState(mostraImagemSensivel);
  const toggleSwitch = () => { 
    setIsEnabled(previousState => !previousState); 
    if(isEnabled){setMostraImagemSensivel(false)}
    else{setMostraImagemSensivel(true)}
  }
  return (  
    <View>
      <View style={styles.dropdown}>
        <TouchableOpacity style={styles.button} onPress={() => {
          if (route.name === "DetalhesDaPatologia"){
            saveLocally();
        }}}>
          <Text style={styles.buttonText}>Salvar Offline</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity style={styles.roundButton}
          onPress={() => {                
            if (route.name === "DetalhesDaPatologia"){
              setTamanhoParagrafo(tamanhoParagrafo - 2);
              setTamanhoTitulo(tamanhoTitulo - 2);
          }}}>
            <Text style={styles.buttonText}> - </Text>
          </TouchableOpacity>
            <Text style={styles.buttonText}>Tamanho do Texto</Text>
          <TouchableOpacity style={styles.roundButton}
            onPress={() => {                
              if (route.name === "DetalhesDaPatologia"){
                setTamanhoParagrafo(tamanhoParagrafo + 2);
                setTamanhoTitulo(tamanhoTitulo + 2);
            }}}>
            <Text style={styles.buttonText} > + </Text>
          </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        /> 
        <Text style={styles.buttonText}>Mostrar Imagens Sensíveis</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    borderRadius: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 50,
    width: '100%',
    zIndex: 1,
    
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  dropdown: {
    height: 50,
    backgroundColor: 'blue',
  },
  roundButton:{
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#fff',
  }
});

export default DropdownMenu;
