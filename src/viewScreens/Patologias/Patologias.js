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
        // <MostraNomesPatologias/>
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