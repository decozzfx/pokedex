import { PokemonResultProps } from "@types";
import { store } from "../store";

const savePokemon = (data: PokemonResultProps) => {
  const dataOld = store.getState().pokemonSave.data;
  // check if exist
  const isExist = dataOld.find(
    (item: PokemonResultProps) => item.id === data.id
  );

  return {
    type: "SAVE_POKEMON",
    payload: isExist ? dataOld : [...dataOld, data],
  };
};

const removePokemon = (id: string) => {
  const dataOld = store.getState().pokemonSave.data;
  return {
    type: "REMOVE_POKEMON",
    payload: dataOld.filter((item: PokemonResultProps) => item.id !== id),
  };
};

export { savePokemon, removePokemon };
