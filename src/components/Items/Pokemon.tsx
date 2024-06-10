import { Image, StyleSheet, View, TouchableNativeFeedback } from "react-native";
import React, { FC, memo } from "react";
import { color, helper, theme } from "@utils";
import { Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { PokemonResultProps, useNavigationProps } from "@types";

const Pokemon: FC<PokemonResultProps> = (props) => {
  //   const getColor = () => {
  // const pokemonColor: any = props.type[0].toLowerCase();
  // const background: any = color;
  // return { backgroundColor: helper.hexToRgb(background[pokemonColor], 0.3) };
  //   };

  const navigation = useNavigation<useNavigationProps>();
  const pokemonId = props.url.substring(34, 35);

  return (
    <View style={styles.wrapper}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(color.ripple, false)}
        onPress={() => navigation.navigate("PokemonShow", { id: pokemonId })}
      >
        <View style={[styles.card]}>
          <View style={theme.toCenter}>
            <Image
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
              }}
              style={styles.img}
            />
            <Text category={"h6"}>{helper.ucwords(props.name)}</Text>
            {/* <Text appearance={"hint"} style={[theme.marginTop5, theme.fontRegular]} category="p2" >{props.type.toString().replace(",", ", ")}</Text> */}
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default Pokemon;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 10,
  },
  img: {
    height: 150,
    width: 150,
    marginBottom: 10,
  },
  wrapper: {
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 16,
  },
});
