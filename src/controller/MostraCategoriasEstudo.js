import React, {useState} from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Text, Image, View} from 'react-native';

// Icone baixado em https://icons8.com/icons
import imagemCategoriaEstudo from '../../assets/microscopio.png'

import listaCategoriasEstudo from '../model/mocks/listaCategoriasEstudo.js';

import { useNavigation } from '@react-navigation/native';

const Item = ({item, onPress, backgroundColor, textColor}) => (

  // Botão customizável e interativo quando pressionado
  <TouchableOpacity onPress={onPress} style={[estilos.item, {backgroundColor}]}>

    {/*<Image source={imagemCategoriaEstudo} style={estilos.imagem} ></Image>*/}

    {/* Abaixo o texto do nome da categoria de estudo retirada da lista de categorias de estudo*/}
    <Text style={[estilos.nomeCategoriaEstudo, {color: textColor}]}>{item.nomeCategoriaEstudo}</Text>
    
  </TouchableOpacity>

);


export default function MostraCategoriasEstudo() {
    
  const [selectedId, setSelectedId] = useState();
  const navigation = useNavigation();
  const renderItem = ({item}) => {
    // O cor de fundo do botão muda da última para primeira quando clicado
    const backgroundColor = item.id === selectedId ? '#0981D1' : '#00AAFF';
    
    // A cor do texto muda de black para white quando clicado
    const color = item.id === selectedId ? 'white' : 'black';
    
    return (
      <Item
        item={item}
        onPress={
          () => { setSelectedId(item.id)
          navigation.navigate('Patologias')
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
      
  return (
    <FlatList
      data={listaCategoriasEstudo}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      extraData={selectedId}
    />
  )
};
  
const estilos = StyleSheet.create({
    item: {
        //flexDirection: "row" ,
        alignItems: 'center',
        padding: 30,
        marginVertical: 30,
        marginHorizontal: 30,
        borderRadius: 10,
      },

    nomeCategoriaEstudo: {
      fontSize: 32,
      textAlign: "center",
      lineHeight: 32,
      fontWeight: 'bold',
      //backgroundColor: '#ffffff'
    },
    /*
    imagem: {
        width: 75,
        height: 75,
       // backgroundColor: '#000000',
        
    },*/
    

});
