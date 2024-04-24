import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { saveLocally } from '../../controller/MostraDetalhesPatologia';
import { useRoute } from '@react-navigation/native';
import { GlobalContext } from './GlobalContext';

const DropdownMenu = () => {
  const {setTamanhoTitulo, setTamanhoParagrafo, tamanhoParagrafo, tamanhoTitulo} = useContext(GlobalContext);
  const route = useRoute();
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
