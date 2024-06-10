import {
  Animated,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { FC } from "react";
import { Icon, Text } from "@ui-kitten/components";
import { color, constant, helper, theme } from "@utils";
import { useNavigation } from "@react-navigation/native";
import { PokemonDetailStateProps, useNavigationProps } from "@types";
import { useSelector } from "react-redux";
import { State } from "src/redux/reducer";

interface Props {}
const PokemonDetailHeader: FC<Props> = ({}) => {
  const navigation = useNavigation<useNavigationProps>();
  return (
    <>
      <StatusBar backgroundColor={color.primary} />
      <Animated.View style={[styles.container]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-back-outline"
              fill={color.white}
              style={styles.icon}
            />
          </TouchableOpacity>
          <View
            style={{ flexDirection: "row", justifyContent: "center", flex: 1 }}
          >
            <Text status={"control"} category="h5" style={styles.title}>
              Pokemon Details
            </Text>
          </View>
        </View>
      </Animated.View>
    </>
  );
};

export default PokemonDetailHeader;

const styles = StyleSheet.create({
  header: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: constant.container,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    ...theme.fontBold,
  },
  icon: {
    height: 28,
    width: 28,
  },
  container: {
    right: 0,
    left: 0,
    backgroundColor: color.primary,
  },
});
