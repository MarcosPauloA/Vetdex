import React, { useCallback, memo, useRef, useState, useEffect } from "react";
import {
  FlatList,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";

import { useRoute, useNavigation } from '@react-navigation/native';
import API_URL from "../../model/config";
import { getAllLocalImages } from "../../model/saveLocalImages";
import * as FileSystem from "expo-file-system";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  slide: {
    height: "auto",
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
    
  },
  slideImage: { width: windowWidth, height: windowHeight, },
  slideTitle: { fontSize: 24  },
  slideSubtitle: { fontSize: 18 },

  pagination: {
    bottom: 8,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    flex: 1
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  paginationDotActive: { backgroundColor: "gray" },
  paginationDotInactive: { backgroundColor: "lightblue" },
  carousel: {height: windowHeight }
});
/*
const teste = {
  image1: require(' file:///data/user/0/host.exp.exponent/files/titulo10'),
  image2: require(' file:///data/user/0/host.exp.exponent/files/titulo21'),
  // Add more images as needed
};
*/



const Slide = memo(function Slide({ data, navigation, id, isImageLocal }) {
  const localUri = data.image;
  return (
    <View style={styles.slide}>
      <Pressable
        onPress={() => {
          navigation.navigate('FullScreenImage',{
            id: id,
            idImagem: data.idImagem,
          });
        }}>
        {isImageLocal ? ( <Image source={{uri: localUri}} style={styles.slideImage}/>
        ) : (
          <Image source={{ uri: data.image }} style={styles.slideImage}></Image>
        )}
        {/*<Text style={styles.slideTitle}>{data.title}</Text>
        <Text style={styles.slideSubtitle}>{data.subtitle}</Text>
        */}
      </Pressable>
    </View>
  );
});



export default function Carousel() {
  // A route servirá para pegar os parâmetros passados da página anterior
  const route = useRoute();
  const { id } = route.params;

  // Estado local para armazenar a lista de objetos de imagens
  const [slideList, setSlideList] = useState([]); 

  const [isImageLocal, setIsImageLocal] = useState(false)

  // Efeito colateral para buscar a lista de objetos de imagens ao montar o componente
  useEffect(() => {
    fetchImagens();
  }, []);

  // Função assíncrona para buscar a lista de objetos de imagens da API
  const fetchImagens = async () => {
    try {
        const response = await fetch(`${API_URL}/listaPatologias/${id}`);
        data = await response.json();
        setSlideList(data.imagens);
      
    } catch(error){
        console.error("Erro ao buscar lista de categorias de estudo ", error)
        imagensLocais = await getAllLocalImages(dadosLocais.nomePatologia);
        imagensLocais = JSON.parse(imagensLocais[0].images)

        if(JSON.stringify(imagensLocais) != "[]"){
          setIsImageLocal(true);
          setSlideList(imagensLocais);
        }
    }
  }

  // Variável utilizada para navegação entre telas
  const navigation = useNavigation();
  
  function Pagination({ index }) {
    return (
      <View style={styles.pagination} pointerEvents="none">
        {slideList.map((_, i) => {
          return (
            <View
              key={i}
              style={[
                styles.paginationDot,
                index === i
                  ? styles.paginationDotActive
                  : styles.paginationDotInactive,
              ]}
            />
          );
        })}
      </View>
    );
  }

  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback(s => String(s.idImagem), []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      []
    ),
  };

  const renderItem = useCallback(function renderItem({ item }) {
    return <Slide data={item} navigation={navigation} id={id} isImageLocal={isImageLocal}/>;
  }, []);

  // Para que se não houver imagem o componente não ocupar espaço na tela foi criado essa condicional
  if (JSON.stringify(slideList) == "[]"){return <></>}
  else{
    return (
      <>
        <FlatList
          data={slideList}
          style={styles.carousel}
          renderItem={renderItem}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={onScroll}
          {...flatListOptimizationProps}
        />
        <Pagination index={index}></Pagination>
      </>
    );
  }}
