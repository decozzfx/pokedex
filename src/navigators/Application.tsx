import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import type { ApplicationStackParamList } from "@/types/navigation";
import { useTheme } from "@/theme";
import RootNavigator from "./rootNavigator";

const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
  const { navigationTheme } = useTheme();

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
