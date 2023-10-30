import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import API_URL from '../model/config';
// Biblioteca para navegação entre telas
import { useRoute } from '@react-navigation/native';

export default function MostraDetalhesPatologia(){
    // A route servirá para pegar os parâmetros passados da página anterior
    const route = useRoute();
    const { id } = route.params;

    // Estado local para armazenar a lista de patologias
    const [detalhesPatologia, setDetalhesPatologia] = useState({}); 

    // Efeito colateral para buscar a lista de patologias ao montar o componente
    useEffect(() => {
      fetchDetalhesPatologia();
    }, []);

    // Função assíncrona para buscar a lista de categoria de patologias da API
    const fetchDetalhesPatologia = async () => {
      try {
          const response = await fetch(`${API_URL}/listaPatologias/${id}`);
          data = await response.json();
          setDetalhesPatologia(data);
        
      } catch(error){
          console.error("Erro ao buscar lista de categorias de estudo ", error)
      }
    }

    // O retorno padrão desta tela é a view abaixo
    return <> 
      <ScrollView>
        <View style={estilos.container}>
          <Text style={estilos.titulo}> Descrição da Doença: </Text>
          <Text style={estilos.paragrafo}> {detalhesPatologia.descricaoDoenca} </Text>
          <Text style={estilos.titulo}> Sinais Clínicos: </Text>
          <Text style={estilos.paragrafo}> {detalhesPatologia.sinaisClinicos} </Text>
          <Text style={estilos.titulo}> Lesões Macroscópicas: </Text>
          <Text style={estilos.paragrafo}> {detalhesPatologia.lesoesMacroscopicas} </Text>
          <Text style={estilos.titulo}> Lesões Microscópicas: </Text>
          <Text style={estilos.paragrafo}> {detalhesPatologia.lesoesMicroscopicas} </Text>
          <Text style={estilos.titulo}> Referências Bibliográficas: </Text>
          <Text style={estilos.paragrafo}> {detalhesPatologia.referenciasBibliograficas} </Text>
        </View> 
      </ScrollView>
    </>
}

const estilos = StyleSheet.create({
    container: {
      borderBottomWidth: 1,
      borderBottomColor: "#ECECEC",
      paddingVertical: 16,
      marginHorizontal: 16,
      alignItems: "center",
    },

    paragrafo: {
      fontSize: 16,
      //lineHeight: 26,
      //marginLeft: 11,
      color: "#000000"
    },

    titulo: {
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold'
    },
  });