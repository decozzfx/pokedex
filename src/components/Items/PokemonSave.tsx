import { Image, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import React, { FC, memo } from "react";
import { Text } from "@ui-kitten/components";
import { color, helper, theme } from "@utils";
import { useNavigation } from "@react-navigation/native";
import { useNavigationProps } from "@types";

interface Props {
  name: string;
  id: string;
  isSelected?: boolean;
  onLongPress: () => void;
  selectedLength: number;
}
const PokemonSave: FC<Props> = ({
  isSelected,
  name,
  id,
  onLongPress,
  selectedLength,
}) => {
  const navigation = useNavigation<useNavigationProps>();

  return (
    <TouchableNativeFeedback
      onPress={() => onLongPress()}
      onLongPress={onLongPress}
      background={TouchableNativeFeedback.Ripple(color.ripple, false)}
    >
      <View style={[styles.content, isSelected && styles.selected]}>
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          }}
          style={styles.img}
        />
        <View style={styles.body}>
          <Text style={theme.fontMedium} numberOfLines={1}>
            {name}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default memo(PokemonSave);

const styles = StyleSheet.create({
  content: {
    width: "48%",
    ...theme.toCenter,
    paddingHorizontal: 10,
    marginBottom: 16,
    paddingVertical: 10,
  },
  img: {
    height: 120,
    width: 120,
    resizeMode: "contain",
  },
  body: {
    marginTop: 16,
    ...theme.toCenter,
  },
  selected: {
    backgroundColor: color.ripple,
    borderWidth: 1,
    borderColor: color.primary,
    borderStyle: "dashed",
  },
});
