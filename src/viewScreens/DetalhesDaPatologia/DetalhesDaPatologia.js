import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import AppBar from '../components/AppBar.js';
import ImageCarousel from '../components/imageCarousel.js'; 
import MostraDetalhesDaPatologia from '../../controller/MostraDetalhesPatologia.js';
import MostraDetalhesDoencaSupabase from '../../controller/MostraDetalhesDoencaSupabase.js';
import ImageCarouselSupabase from '../components/ImageCarouselSupabase.js';

export default function DetalhesDaPatologia(){
    return <>  
        <AppBar/>
        <ScrollView>
          <ImageCarouselSupabase/>
          <MostraDetalhesDoencaSupabase/>
        </ScrollView>
    </>
}