import React from 'react';
import { StyleSheet, ScrollView, View, Button } from 'react-native';
import AppBar from '../components/AppBar.js';
import ImageCarousel from '../components/imageCarousel.js'; 
import MostraDetalhesDaPatologia from '../../controller/MostraDetalhesPatologia.js';

import { useNavigation } from '@react-navigation/native';


export default function DetalhesDaPatologia(){
  const navigation = useNavigation();
    const tem3D = true;
    return <>  
        <AppBar/>
        <ScrollView>
          <ImageCarousel/>
          {tem3D && <Button title='3D' onPress={() => {navigation.navigate("Model3DScreen")}}></Button>}
          <MostraDetalhesDaPatologia/>
        </ScrollView>
    </>
}