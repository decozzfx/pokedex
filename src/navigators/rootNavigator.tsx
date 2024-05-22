import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackNavigationTypes, routesEnum } from "./routes";
import { Example, Startup } from "@/screens";

const Stack = createNativeStackNavigator<RootStackNavigationTypes>();
const { Navigator } = Stack;
const { Screen } = Stack;
import { useTheme } from "@/theme";

function RootNavigator() {
  const { variant } = useTheme();

  return (
    <Navigator key={variant} screenOptions={{ headerShown: false }}>
      <Screen name={routesEnum.Startup} component={Startup} />
      <Screen name={routesEnum.Example} component={Example} />
    </Navigator>
  );
}

export default React.memo(RootNavigator);
