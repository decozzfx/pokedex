import { FlatList, StyleSheet, BackHandler, Alert } from "react-native";
import React, { useEffect } from "react";
import { DetailLayout, Empty, PokemonSave } from "@components";
import { constant, theme } from "@utils";
import {
  PokemonResultProps,
  PokemonSaveStateProps,
  PokemonSelectedStateProps,
} from "@types";
import { useDispatch, useSelector } from "react-redux";
import { State } from "src/redux/reducer";
import {
  emptyPokemonSelected,
  setPokemonSelected,
} from "src/redux/actions/pokemonSelectedAction";
import { removePokemon } from "src/redux/actions/pokemonSaveAction";

const PokemonSaveScreen = () => {
  const pokemonSaveState: PokemonSaveStateProps = useSelector(
    (state: State) => state.pokemonSave
  );
  const pokemonSelectedState: PokemonSelectedStateProps = useSelector(
    (state: State) => state.pokemonSelected
  );
  const pokemonSelectedLength = pokemonSelectedState.data.length;
  const dispatch = useDispatch();

  useEffect(() => {
    const backAction = () => {
      if (pokemonSelectedLength > 0) {
        dispatch(emptyPokemonSelected());
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [pokemonSelectedLength]);

  const onRemovePokemon = () => {
    // confim remove
    Alert.alert(
      "Confirm",
      "Are you sure to remove this pokemon?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: () => {
            pokemonSelectedState.data.map((id: string) =>
              dispatch(removePokemon(id))
            );
            dispatch(emptyPokemonSelected());
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <DetailLayout
      actionIcon={pokemonSelectedLength > 0 ? "trash-2-outline" : undefined}
      actionOnPress={onRemovePokemon}
      title={
        pokemonSelectedLength > 0
          ? `${pokemonSelectedLength} Item Selected`
          : "My Pokemon"
      }
    >
      {pokemonSaveState.data.length > 0 ? (
        <FlatList
          data={pokemonSaveState.data}
          numColumns={2}
          columnWrapperStyle={theme.flexBetween}
          keyExtractor={(item: PokemonResultProps) => item.id.toString()}
          contentContainerStyle={styles.flatlist}
          renderItem={({ item }) => (
            <PokemonSave
              id={item.id}
              name={item.name}
              selectedLength={pokemonSelectedLength}
              onLongPress={() => dispatch(setPokemonSelected(item.id))}
              isSelected={pokemonSelectedState.data.includes(item.id)}
            />
          )}
        />
      ) : (
        <Empty />
      )}
    </DetailLayout>
  );
};

export default PokemonSaveScreen;

const styles = StyleSheet.create({
  flatlist: {
    paddingVertical: 16,
    paddingHorizontal: constant.container,
  },
});
