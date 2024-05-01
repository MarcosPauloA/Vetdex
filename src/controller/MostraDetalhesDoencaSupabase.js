import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import API_URL from '../model/config';
// Biblioteca para navegação entre telas
import { useRoute } from '@react-navigation/native';
import { savePatologia, dropTable, fetchLocalPatologia } from '../model/saveLocalPatologia';
import { dropImageTable } from '../model/saveLocalImages';
import { GlobalContext } from '../viewScreens/components/GlobalContext';
import { GetDoencaById } from '../model/GetFromSupabase';
let listaDetalhes = [];
export default function MostraDetalhesPatologia(){
    const {tamanhoTitulo, tamanhoParagrafo} = useContext(GlobalContext);

    // A route servirá para pegar os parâmetros passados da página anterior
    const route = useRoute();
    const { id } = route.params;
  
    // Estado local para armazenar a lista de patologias
    const [detalhesPatologia, setDetalhesPatologia] = useState({}); 

    // Efeito colateral para buscar a lista de patologias ao montar o componente
    useEffect(() => {
    //dropTable()
    //dropImageTable()
      fetchDetalhesPatologia();
    }, []);

    // Função assíncrona para buscar a lista de categoria de patologias da API
    const fetchDetalhesPatologia = async () => {
      try {
          const dados = await GetDoencaById(id);
          setDetalhesPatologia(dados[0]);
      } catch(error){
          console.error("Erro ao buscar lista de categorias de estudo ", error);
          console.log("Buscando do banco de dados local...");
          const { nomePatologia } = route.params;
          dadosLocais = await fetchLocalPatologia(nomePatologia);
          setDetalhesPatologia(dadosLocais);
      }
    }

    // O retorno padrão desta tela é a view abaixo
    return <> 
      <ScrollView>
        <View style={estilos.container}>
          <Text style={[estilos.titulo, {fontSize: tamanhoTitulo}]}> Descrição da Doença: </Text>
          <Text style={[estilos.paragrafo, {fontSize: tamanhoParagrafo}]}> {detalhesPatologia.doenca_descricao} </Text>
          <Text style={[estilos.titulo, {fontSize: tamanhoTitulo}]}> Sinais Clínicos: </Text>
          <Text style={[estilos.paragrafo, {fontSize: tamanhoParagrafo}]}> {detalhesPatologia.doenca_sinaisclinicos} </Text>
          <Text style={[estilos.titulo, {fontSize: tamanhoTitulo}]}> Lesões Macroscópicas: </Text>
          <Text style={[estilos.paragrafo, {fontSize: tamanhoParagrafo}]}> {detalhesPatologia.doenca_lesoesmicroscopicas} </Text>
          <Text style={[estilos.titulo, {fontSize: tamanhoTitulo}]}> Lesões Microscópicas: </Text>
          <Text style={[estilos.paragrafo, {fontSize: tamanhoParagrafo}]}> {detalhesPatologia.doenca_lesoesmacroscopicas} </Text>
          <Text style={[estilos.titulo, {fontSize: tamanhoTitulo}]}> Referências Bibliográficas: </Text>
          <Text style={[estilos.paragrafo, {fontSize: tamanhoParagrafo}]}> {detalhesPatologia.doenca_referenciabibliografica} </Text>
        </View> 
      </ScrollView>
    </>
}

export async function saveLocally(){
  await savePatologia(listaDetalhes);
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
      // Em uma atualização a fontSize foi trocada por um valor dinamico
      // Dessa forma o usuário pode aumentar ou diminuir a fonte
      // fontSize: 16,
      //lineHeight: 26,
      //marginLeft: 11,
      color: "#000000"
    },

    titulo: {
      // Em uma atualização a fontSize foi trocada por um valor dinamico
      // Dessa forma o usuário pode aumentar ou diminuir a fonte
      // fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold'
    },
  });