import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import RootStackList from "./page-types";

export type PageProps<
  RouteName extends keyof RootStackList = keyof RootStackList
> = NativeStackScreenProps<RootStackList, RouteName>;
export type useNavigationProps = NativeStackNavigationProp<RootStackList>;

// Http Types
export interface PokemonResultProps {
  name: string;
  id: string;
}

export interface SearchStateProps {
  data: string;
}

export type ReducerProps = any;

export interface StatsResultProps {
  total: number;
  hp: number;
  attack: number;
  defense: number;
  speedAttack: number;
  speedDefense: number;
  speed: number;
}

export interface PokemonDetailProps {
  name: string;
  id: string;
}
export interface PokemonDetailStateProps {
  data: PokemonDetailProps;
}

export interface PokemonSaveStateProps {
  data: PokemonResultProps[];
}

export interface PokemonSelectedStateProps {
  data: string[];
}
