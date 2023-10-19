import React from "react";

// Biblioteca responsável pelo appbar
import { AppBar, HStack, IconButton } from "@react-native-material/core";

// Icones
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome5 } from '@expo/vector-icons';

// Navegação
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

import listaPatologias from '../../model/mocks/listaPatologias'

export default function appBar(){
    // O navigation servirá para retornar a página anterior quando clicado no ícone de voltar
    const navigation = useNavigation();
    // A route servirá para pegar o nome da tela atual e designar os ícones correspondentes.
    const route = useRoute();
    let nomeIcone,titulo;
    if (route.name === "Home") {
        nomeIcone = "home"
        titulo = "Vetdex"
    } else if (route.name === "Patologias") {
        nomeIcone = "arrow-circle-left"
        titulo = "Patologias" 
    } else if (route.name === "DetalhesDaPatologia") {
        nomeIcone = "arrow-circle-left"
        const { id } = route.params;
        titulo = listaPatologias[id].nomePatologia;
    }
    return<>
        <AppBar
            title={titulo}
            leading={props => (
            <IconButton icon={props => <FontAwesome5 
                 onPress={() => {if(nomeIcone != "home") {navigation.goBack()}}}
                 name={nomeIcone} size={24} color="black" {...props} />} {...props} />
            )}
            trailing={props => (
            <HStack>
                <IconButton
                    onPress={() => alert('Feature em desenvolvimento!')}
                    icon={props => <Icon name="magnify" {...props} />}
                    {...props}
                />
                <IconButton
                    onPress={() => alert('Feature em desenvolvimento!')}
                    icon={props => <Icon name="dots-vertical" {...props} />}
                    {...props}
                />
            </HStack>
            )}
        />
  </>
}
