// Tela Login que foi descontinuada e não é mais necessária
import React from 'react';
import { Text, View, StyleSheet, TextInput, Image, Button, Alert } from 'react-native';
import iconeMedicinaVet from '../../../assets/iconeMedicinaVet.png';

export default function Login(){
    return <>
        <View style={estilos.container}>
            <Image source={iconeMedicinaVet} style={estilos.imagem} />
            <Text style={estilos.textoLogin}>Bem Vindo Ao VetDex!</Text>
            <TextInput
                style={estilos.input}
                placeholder="E-mail"
                autoComplete='email'
            />

            <TextInput
                style={estilos.input}
                placeholder="Senha"
                autoComplete='current-password'
            />

            <Button
                title="LOGIN"
                onPress={() => Alert.alert('Login Imaginário Com Sucesso!')}
            />

        </View>
    </>
}

const estilos = StyleSheet.create({
    container: {

    },

    imagem: {
        width:'100%',
    },

    textoLogin: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});