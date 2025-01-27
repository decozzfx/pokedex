import {
  Animated,
  Easing,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { FC, PropsWithChildren, useRef } from "react";
import { color, helper, theme } from "@utils";
import PokemonDetailHeader from "../Header/PokemonDetailHeader";
import Loading from "../Loading";
import { PokemonDetailStateProps } from "@types";
import { useSelector } from "react-redux";
import { State } from "src/redux/reducer";

interface Props {
  isLoading: boolean;
}
const PokemonDetailLayout: FC<PropsWithChildren<Props>> = ({
  children,
  isLoading,
}) => {
  const pokemonDetailState: PokemonDetailStateProps = useSelector(
    (state: State) => state.pokemonDetail
  );
  const headerAnimation = useRef(new Animated.Value(0)).current;

  const { colorTheme, num } = pokemonDetailState.data;
  const headerInterpolate = headerAnimation.interpolate({
    inputRange: [0, 5, 25, 40, 50],
    outputRange: [
      helper.hexToRgb(colorTheme, 0),
      helper.hexToRgb(colorTheme, 0.2),
      helper.hexToRgb(colorTheme, 0.6),
      helper.hexToRgb(colorTheme, 0.9),
      helper.hexToRgb(colorTheme, 1),
    ],
    extrapolate: "clamp",
    easing: Easing.ease,
  });

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    headerAnimation.setValue(event.nativeEvent.contentOffset.y - 50);
  };
  return (
    <View style={[theme.flex1]}>
      <PokemonDetailHeader />
      {isLoading ? (
        <Loading style={styles.loading} background={color.primary} />
      ) : (
        <ScrollView
          style={{ marginTop: 20 }}
          scrollEventThrottle={16}
          onScroll={onScroll}
        >
          <View style={styles.spacer} />

          <View style={styles.content}>
            <View style={styles.body}>{children}</View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default PokemonDetailLayout;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  banner: {
    height: 160,
    alignItems: "center",
    zIndex: 9999,
  },
  img: {
    height: 230,
    resizeMode: "contain",
    width: 230,
  },
  content: {
    flex: 1,
    borderRadius: 10,
  },
  watermark: {
    height: 270,
    width: 270,
    resizeMode: "contain",
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 999,
  },
  body: {
    marginTop: 80,
  },
  spacer: {
    height: 125,
  },
  loading: {
    color: color.white,
    ...theme.fontMedium,
  },
});
