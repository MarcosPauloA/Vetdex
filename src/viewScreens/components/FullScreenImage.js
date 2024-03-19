import React, { useCallback, memo, useRef, useState, useEffect } from "react";
import {
  FlatList,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';
import API_URL from "../../model/config";
import { FontAwesome5 } from '@expo/vector-icons';
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import { IconButton } from "@react-native-material/core";
import { getAllLocalImages } from "../../model/saveLocalImages";

const styles = StyleSheet.create({
  slide: {
    height: 'auto',
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",

  },
  slideImage: { width: windowWidth, height: windowHeight, flex: 1 },
  slideTitle: { fontSize: 24, position: 'absolute', top: 0, left: windowWidth / 3, right: 0, bottom: 0 },
  slideSubtitle: { fontSize: 18, position: 'absolute', top: windowHeight / 1.5, left: 0, right: 0, bottom: 0 },

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
  paginationDotActive: { backgroundColor: "lightblue" },
  paginationDotInactive: { backgroundColor: "gray" },
  carousel: { height: windowHeight },
  icon: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }
});

const Slide = memo(function Slide({ data }) {
  return (
    <View style={styles.slide}>
      <Image source={{ uri: data.image }} style={styles.slideImage}></Image>
      <Text style={styles.slideTitle}>{data.title}</Text>
      <Text style={styles.slideSubtitle}>{data.subtitle}</Text>

    </View>
  );
});



export default function Carousel() {
  // O navigation servirá para retornar a página anterior quando clicado no ícone de voltar
  const navigation = useNavigation();
  // A route servirá para pegar os parâmetros passados da página anterior
  const route = useRoute();
  const { id, idImagem } = route.params;

  // Estado local para armazenar a lista de objetos de imagens
  const [slideList, setSlideList] = useState([]);

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

    } catch (error) {
      console.error("Erro ao buscar lista de categorias de estudo ", error)
      const { nomePatologia } = route.params;
      imagensLocais = await getAllLocalImages(nomePatologia.nomePatologia);
      imagensLocais = JSON.parse(imagensLocais[0].images)
      if(JSON.stringify(imagensLocais) != "[]"){
        setSlideList(imagensLocais);
      }
    }
  }

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
    return <Slide data={item} />;
  }, []);

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
        initialScrollIndex={idImagem}
      />
      <IconButton style={styles.icon} icon={<FontAwesome5
        onPress={() => { navigation.goBack() }}
        name={"arrow-circle-left"} size={24} color="black" />} />
      <Pagination index={index}></Pagination>
    </>
  );
}
