import { store } from "../store";

const setPokemonSelected = (id: string) => {
  const pokemon = store.getState().pokemonSelected.data;
  if (pokemon.includes(id)) {
    return {
      type: "SET_POKEMON_SELECTED",
      payload: pokemon.filter((item: string) => item !== id),
    };
  } else {
    return {
      type: "SET_POKEMON_SELECTED",
      payload: [...pokemon, id],
    };
  }
};

const emptyPokemonSelected = () => {
  return {
    type: "EMPTY_POKEMON_SELECTED",
    payload: [],
  };
};

export { setPokemonSelected, emptyPokemonSelected };
