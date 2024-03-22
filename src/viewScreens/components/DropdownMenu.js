import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { saveLocally } from '../../controller/MostraDetalhesPatologia';
import { useRoute } from '@react-navigation/native';

const DropdownMenu = () => {
  const route = useRoute();
  return (
    <View style={styles.dropdown}>
      <TouchableOpacity style={styles.button} onPress={() => {                
        if (route.name === "DetalhesDaPatologia"){
          saveLocally();
      }}}>
        <Text style={styles.buttonText}>Salvar Localmente</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 50,
    width: '75%',
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
});

export default DropdownMenu;
