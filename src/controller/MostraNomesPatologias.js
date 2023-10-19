import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import listaPatologias from '../model/mocks/listaPatologias'

import { useNavigation } from '@react-navigation/native';

const Item = ({nomePatologia, navigation, itemId}) => (
    <View style={estilos.item}>
      <Text 
        style={estilos.nome} 
        onPress={()=> { 
          // Ao Pressionar navegar para a página de detalhes passando como parâmetro um JSON com o id do item da lista clicado para a página de detalhes
          navigation.navigate('DetalhesDaPatologia',{
            id: itemId,
          });}}
      >
        { nomePatologia }
      </Text>
    </View>
)

export default function MostraNomesPatologias(){
  const navigation = useNavigation();
    return <>  
        <FlatList
        data={listaPatologias}
        renderItem={({item}) => <Item nomePatologia={item.nomePatologia} 
          navigation={navigation} 
          itemId={item.id}
        />}
        keyExtractor={ item  => item.id }
        />
    </>
}


const estilos = StyleSheet.create({
    item: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#000000",
      paddingVertical: 16,
      marginHorizontal: 16,

    },
    nome: {
      fontSize: 20,
      lineHeight: 26,
      marginLeft: 11,
      color: "#000000"
    },
});