import React, { useCallback, memo, useRef, useState } from "react";
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
import listaPatologias from '../../model/mocks/listaPatologias'

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  slide: {
    height: 'auto',
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
    
  },
  slideImage: { width: windowWidth, height: windowHeight, flex:1 },
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
  paginationDotActive: { backgroundColor: "lightblue" },
  paginationDotInactive: { backgroundColor: "gray" },
  carousel: {height: windowHeight }
});

const Slide = memo(function Slide({ data, navigation, id }) {
  return (
    <View style={styles.slide}>
      <Pressable
        onPress={() => {
          navigation.navigate('FullScreenImage',{
            id: id,
            idImagem: data.id,
          });
        }}>
        <Image source={{ uri: data.image }} style={styles.slideImage}></Image>
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
  const slideList = listaPatologias[id].imagens;

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
    return <Slide data={item} navigation={navigation} id={id}/>;
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
