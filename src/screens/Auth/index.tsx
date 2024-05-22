import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { useTheme } from "@/theme";
import { Brand } from "@/components/molecules";
import { SafeScreen } from "@/components/template";

import type { ApplicationScreenProps } from "@/navigators/routes";
import { TextBase } from "@/components/derivatives/text";

function Auth({ navigation }: ApplicationScreenProps) {
  const { layout } = useTheme();

  const { isSuccess, isFetching, isError } = useQuery({
    queryKey: ["Auth"],
    queryFn: () => {
      return Promise.resolve(true);
    },
  });

  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.itemsCenter,
          layout.justifyCenter,
        ]}
      >
        <Brand />
        <TextBase light color={"#8696BB"} size={15}>
          Kesehatan adalah aset berharga
        </TextBase>
      </View>
    </SafeScreen>
  );
}

export default Auth;
