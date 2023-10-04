import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import listaPatologias from '../model/mocks/listaPatologias'

const Item = ({nomePatologia}) => (
    <View style={estilos.item}>
      <Text style={estilos.nome}>{ nomePatologia }</Text>
    </View>
)

export default function MostraNomesPatologias(){
    return <>  
        <FlatList
        data={listaPatologias}
        renderItem={({item}) => <Item nomePatologia={item.nomePatologia} />}
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