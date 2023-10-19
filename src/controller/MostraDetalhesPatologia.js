import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import listaPatologias from '../model/mocks/listaPatologias'

// Biblioteca para navegação entre telas
import { useRoute } from '@react-navigation/native';

const Item = ({descricaoDoenca, sinaisClinicos, lesoesMacro, lesoesMicro, refBib }) => (
    <View style={estilos.item}>
      <Text style={estilos.titulo}> Descrição da Doença: </Text>
      <Text style={estilos.paragrafo}> {descricaoDoenca} </Text>
      <Text style={estilos.titulo}> Sinais Clínicos: </Text>
      <Text style={estilos.paragrafo}> {sinaisClinicos} </Text>
      <Text style={estilos.titulo}> Lesões Macroscópicas: </Text>
      <Text style={estilos.paragrafo}> {lesoesMacro} </Text>
      <Text style={estilos.titulo}> Lesões Microscópicas: </Text>
      <Text style={estilos.paragrafo}> {lesoesMicro} </Text>
      <Text style={estilos.titulo}> Referências Bibliográficas: </Text>
      <Text style={estilos.paragrafo}> {refBib} </Text>
    </View>
)

export default function MostraDetalhesPatologia(){
    // A route servirá para pegar os parâmetros passados da página anterior
    const route = useRoute();
    const { id } = route.params;
    lista = [listaPatologias[id]];
    return <> 
        <FlatList
            initialNumToRender={1}
            data={lista}
            renderItem={({item}) => <Item descricaoDoenca={item.descricaoDoenca} 
              sinaisClinicos={item.sinaisClinicos}
              lesoesMacro={item.lesoesMacroscopicas}
              lesoesMicro={item.lesoesMicroscopicas}
              refBib={item.referenciasBibliograficas}
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