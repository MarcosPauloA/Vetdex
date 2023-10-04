import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import listaPatologias from '../model/mocks/listaPatologias'

const Item = ({descricaoDoenca, sinaisClinicos}) => (
    <View style={estilos.item}>
      <Text style={estilos.titulo}> Descrição da Doença: </Text>
      <Text style={estilos.paragrafo}> {descricaoDoenca} </Text>
      <Text style={estilos.titulo}> Sinais Clínicos: </Text>
      <Text style={estilos.paragrafo}> {sinaisClinicos} </Text>
    </View>
)

export default function MostraDetalhesPatologia(){
    return <>  
        <FlatList
            initialNumToRender={1}
            data={listaPatologias}
            renderItem={({item}) => <Item descricaoDoenca={item.descricaoDoenca} 
              sinaisClinicos={item.sinaisClinicos}
            />}
            keyExtractor={ item  => item.id }
        />

    </>
}

const estilos = StyleSheet.create({
    item: {
      borderBottomWidth: 1,
      borderBottomColor: "#ECECEC",
      paddingVertical: 16,
      marginHorizontal: 16,
      alignItems: "center",
    },

    paragrafo: {
      fontSize: 15,
      lineHeight: 26,
      marginLeft: 11,
      color: "#000000"
    },

    titulo: {
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold'
    },
  });