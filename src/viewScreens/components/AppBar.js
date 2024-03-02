import React, { useState } from "react";
import { Modal, View, TextInput, StyleSheet, Button, Keyboard, Text, TouchableOpacity } from "react-native";
// Biblioteca responsável pelo appbar
import { AppBar, HStack, IconButton } from "@react-native-material/core";

// Icones
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome5, Feather } from '@expo/vector-icons';

// Navegação
import { useNavigation, useRoute } from '@react-navigation/native';
import MostraNomesPatologias from "../../controller/MostraNomesPatologias";

export default function appBar() {
    // O navigation servirá para retornar a página anterior quando clicado no ícone de voltar
    const navigation = useNavigation();
    // A route servirá para pegar o nome da tela atual e designar os ícones correspondentes.
    const route = useRoute();
    let nomeIcone, titulo;
    if (route.name === "Home") {
        nomeIcone = "home"
        titulo = "Vetdex"
    } else if (route.name === "Patologias") {
        nomeIcone = "arrow-circle-left"
        titulo = "Patologias"
    } else if (route.name === "DetalhesDaPatologia") {
        nomeIcone = "arrow-circle-left"
        const { nomePatologia } = route.params;
        titulo = nomePatologia.nomePatologia;
    }
    const [modalVisible, setModalVisible] = useState(false)
    const [fraseBusca, setFraseBusca] = useState("");
    const [optionsVisible, setOptionsVisible] = useState(false);
    return <>
        {/*Search Modal that is shown when the search icon is clicked*/}
        <Modal
            style={estilos.modal}
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
            <View style={estilos.container}>
                <View style={estilos.searchBarClicada}>
                    {/* search Icon */}
                    <Feather
                        name="search"
                        size={20}
                        color="black"
                        style={{ marginLeft: 1 }}
                    />

                    {/* Input field */}
                    <TextInput
                        style={estilos.textoBusca}
                        placeholder="Busca"
                        value={fraseBusca}
                        onChangeText={setFraseBusca}
                        onEndEditing={() => {
                            setModalVisible(false)
                            navigation.navigate('Patologias', { nomeBuscado: { fraseBusca } })
                        }}

                    />
                </View>
                {/* cancel button, depending on whether the search bar is clicked or not */}
                {modalVisible && (
                    <Button
                        title="Cancelar"
                        onPress={() => {
                            Keyboard.dismiss();
                            setModalVisible(false);
                        }}
                    ></Button>
                )}
            </View>
        </Modal>
        
        {/*Settings modal that is shown when the three dot icon is clicked*/}
        <Modal
            style={estilos.modal}
            animationType="fade"
            transparent={true}
            visible={optionsVisible}
        >   
            <View style={estilos.container}>
            <TouchableOpacity style={estilos.configButton}>
                <Icon name="cog" size={24} color="#fff" />
            </TouchableOpacity>
            <Button style={estilos.configText} title="Salvar Offline"></Button>
            <Button
                        title="Cancelar"
                        onPress={() => {setOptionsVisible(false);}}
            ></Button>
            </View>
        </Modal>

        {/*Bellow is the default appbar and icons when nothing is clicked*/}
        <AppBar
            title={titulo}
            leading={props => (
                <IconButton icon={props => <FontAwesome5
                    onPress={() => { if (nomeIcone != "home") { navigation.goBack() } }}
                    name={nomeIcone} size={24} color="black" {...props} />} {...props} />
            )}
            trailing={props => (
                <HStack>
                    <IconButton
                        onPress={() => (setModalVisible(!modalVisible))}
                        icon={props => <Icon name="magnify" {...props} />}
                        {...props}
                    />
                    <IconButton
                        onPress={() => setOptionsVisible(!optionsVisible)}
                        icon={props => <Icon name="dots-vertical" {...props} />}
                        {...props}
                    />
                </HStack>
            )}
        />
    </>
}

const estilos = StyleSheet.create({
    container: {
        margin: 5,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "80%",
    },

    searchBarNaoClicada: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
    },
    searchBarClicada: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
    },

    textoBusca: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
    },
    modal: {
        height: 300,
        width: 300,
        backgroundColor: '#000'
    },
    configButton: {
        width: 45,
        height: 45,
        borderRadius: 20,
        backgroundColor: "#333",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
      },
    configText: {
        height: 40,
        width: 250,
        backgroundColor: "#333"
    }
});