import React from "react";
import { AppBar, HStack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome5 } from '@expo/vector-icons';

export default function appBar(){
    return<>
        <AppBar
            title="Patologias"
            leading={props => (
            <IconButton icon={props => <FontAwesome5 name="arrow-circle-left" size={24} color="black" {...props} />} {...props} />
            )}
            trailing={props => (
            <HStack>
                <IconButton
                icon={props => <Icon name="magnify" {...props} />}
                {...props}
                />
                <IconButton
                icon={props => <Icon name="dots-vertical" {...props} />}
                {...props}
                />
            </HStack>
            )}
        />
  </>
}
