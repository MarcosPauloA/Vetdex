// Tela que mostra os nomes das patologias
import React from 'react';

import { View, StyleSheet, Text, FlatList } from 'react-native';

import AppBar from '../components/AppBar.js';

import MostraNomesPatologias from '../../controller/MostraNomesPatologias.js';
import MostraNomesDoencaSupabases from '../../controller/MostraNomesDoencaSupabase.js';

const Item = ({nomePatologia}) => (
    <View style={estilos.item}>
      <Text style={estilos.nome}>{ nomePatologia }</Text>
    </View>
)

export default function Patologias(){
    return <>
      <AppBar/>
      <View style={estilos.fundo}>
        {
        // <MostraNomesPatologias/> Inutilizado após nomes das patologias virem do supabase ao invés da mockAPI
        }
        <MostraNomesDoencaSupabases/>
      </View>
    </>
    
}

const estilos = StyleSheet.create({
    fundo: {
      backgroundColor: '#ffffff'
    }
  });