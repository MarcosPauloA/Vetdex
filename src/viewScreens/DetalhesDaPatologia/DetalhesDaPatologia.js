import React from 'react';

import { StyleSheet, Image } from 'react-native';

import AppBar from '../components/AppBar.js';
import ImageCarousel from '../components/ImageCarousel.js'; 

import imagemExemplo from '../../../assets/medicina-veterinaria.jpg'
import MostraDetalhesDaPatologia from '../../controller/MostraDetalhesPatologia.js';



export default function DetalhesDaPatologia(){
    return <>  
        <AppBar/>
        <ImageCarousel/>
        {/* <Image source={imagemExemplo} style={estilos.imagemExemplo} /> */}
        <MostraDetalhesDaPatologia/>
    </>
}

const estilos = StyleSheet.create({
    imagemExemplo: {
      width: '100%',
      height: '30%',
    },
  });