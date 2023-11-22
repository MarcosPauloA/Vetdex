import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import AppBar from '../components/AppBar.js';
import ImageCarousel from '../components/imageCarousel.js'; 
import MostraDetalhesDaPatologia from '../../controller/MostraDetalhesPatologia.js';



export default function DetalhesDaPatologia(){
    return <>  
        <AppBar/>
        <ScrollView>
          <ImageCarousel/>
          <MostraDetalhesDaPatologia/>
        </ScrollView>
    </>
}

const estilos = StyleSheet.create({
    imagemExemplo: {
      width: '100%',
      height: '30%',
    },
  });