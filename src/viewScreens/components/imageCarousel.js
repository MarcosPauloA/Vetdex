import React, { useCallback, memo, useRef, useState } from "react";
import {
  FlatList,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
} from "react-native";

import { useRoute } from '@react-navigation/native';
import listaPatologias from '../../model/mocks/listaPatologias'

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  slide: {
    paddingTop: 160,
    height: 'auto',
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  slideImage: { width: windowWidth, height: undefined, aspectRatio:'1' },
  slideTitle: { fontSize: 24 },
  slideSubtitle: { fontSize: 18 },

  pagination: {
    bottom: 8,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  paginationDotActive: { backgroundColor: "lightblue" },
  paginationDotInactive: { backgroundColor: "gray" },
});

{/*
const slideList = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
    title: "titulo1",
    subtitle: "subtitulo1",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
    title: "titulo2",
    subtitle: "subtitulo2",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
    title: "titulo3",
    subtitle: "subtitulo3",
  },  
];

const slideList = Array.from({ length: 30 }).map((_, i) => {
  return {
    id: i,
    image: `https://picsum.photos/1440/2842?random=${i}`,
    title: `This is the title ${i + 1}!`,
    subtitle: `This is the subtitle ${i + 1}!`,
  };
});
*/}
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
  // A route servirá para pegar os parâmetros passados da página anterior
  const route = useRoute();
  const { id } = route.params;
  const slideList = listaPatologias[id].imagens;

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
    keyExtractor: useCallback(s => String(s.id), []),
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
      />
      <Pagination index={index}></Pagination>
    </>
  );
}
