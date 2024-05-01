import React from 'react';
import { StyleSheet, Image, Dimensions, Text, TouchableOpacity, View } from 'react-native';

import imagemMedVet from '../../../assets/medicina-veterinaria2.jpg';

import AppBar from '../components/AppBar.js'
import MostraCategoriasEstudo from '../../controller/MostraCategoriasEstudo.js';
const screenWidth = Dimensions.get('screen').width;
const larguraImagemMedVet = 900;
const alturaImagemMedVet = 600;

export default function Home(){
    return <>
            <AppBar/>

            <Image source={imagemMedVet} style={estilos.imagem} />

            <MostraCategoriasEstudo/>
    </>
}

const estilos = StyleSheet.create({
    imagem: {
        width: "100%",
        height: alturaImagemMedVet / larguraImagemMedVet * screenWidth,
        
    },

    botao: {
        marginTop: 16,
        backgroundColor: "#03224C",
        paddingVertical: 16,
        borderRadius: 6,
    },

    textoBotao: {
        textAlign: "center",
        fontSize: 16,
        lineHeight: 26,
        fontWeight: 'bold',
    },
});

        /*
        <TouchableOpacity style={estilos.botao}>
            <Text style={estilos.textoBotao}> PATOLOGIA </Text>
        </TouchableOpacity>
        */