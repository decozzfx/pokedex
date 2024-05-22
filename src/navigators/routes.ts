export enum routesEnum {
  Auth = "Auth",
  Example = "Example",
}

export type RootStackNavigationTypes = {
  [routesEnum.Auth]: undefined;
  [routesEnum.Example]: undefined;
};

import type { StackScreenProps } from "@react-navigation/stack";

export type ApplicationScreenProps = StackScreenProps<RootStackNavigationTypes>;
