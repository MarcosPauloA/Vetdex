// Arquivo responsável por mostrar os nomes das patologias do supabase
import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, Text, View, Alert } from 'react-native';
import API_URL from '../model/config';
import { useNavigation, useRoute } from '@react-navigation/native';
import BuscaNomePatologia from './BuscaNomePatologia';
import { fetchLocalPatologia, getAllLocalPatologiasNames } from '../model/saveLocalPatologia';
import { GetDoencasNomes } from '../model/GetFromSupabase';
// Item da lista
const Item = ({nomePatologia, navigation, itemId}) => (
    <View style={estilos.item}>
      <Text 
        style={estilos.nome} 
        onPress={()=> { 
          // Ao Pressionar navegar para a página de detalhes passando como parâmetro um JSON com o id do item da lista clicado para a página de detalhes
          navigation.navigate('DetalhesDaPatologia',{
            id: itemId, nomePatologia: {nomePatologia}
          });}}
      >
        { nomePatologia }
      </Text>
    </View>
)

export default function MostraNomesDoencaSupabases(){
  // A route servirá para pegar os parâmetros passados da página anterior
  const route = useRoute();
  const { nomeBuscado } = route.params;

  if(nomeBuscado == ""){
  // Efeito colateral para buscar a lista de patologias ao montar o componente
  useEffect(() => {
    fetchListaPatologias();
  }, [nomeBuscado]);}
  else{
  useEffect(() => {
    busca();
  }, [nomeBuscado]);}
  // Estado local para armazenar a lista de patologias
  const [listaPatologias, setListaPatologias] = useState([]); 

  // Função assíncrona para buscar a lista de categoria de patologias da API
  const fetchListaPatologias = async () => {
    try {
        const dados = await GetDoencasNomes();
        setListaPatologias(dados);
      
    } catch(error){
        console.error("Erro ao buscar lista de categorias de estudo ", error);
        console.log("Tentando buscar de banco de dados local...");
        dados = await getAllLocalPatologiasNames();
        setListaPatologias(dados);

    }
  }

  // Variável utilizada para navegação entre telas
  const navigation = useNavigation();

  // Função de busca de palavra chave
    async function busca(){
      resultadoBusca = await BuscaNomePatologia(nomeBuscado.fraseBusca)
      if (JSON.stringify(resultadoBusca) != undefined) {
          setListaPatologias(resultadoBusca[0])
      }
    }
  // O retorno padrão desta tela é a flatlist abaixo
  return <>  
    <View style={estilos.container}>
      <FlatList
       data={listaPatologias}
       renderItem={({item}) => <Item nomePatologia={item.doenca_nome} 
        navigation={navigation} 
        itemId={item.id}
      />}
       keyExtractor={ item  => item.id }
      />
    </View>
  </>
}


const estilos = StyleSheet.create({
    container: {paddingBottom: 50}, // Para que o appbar não tampe o último elemento
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