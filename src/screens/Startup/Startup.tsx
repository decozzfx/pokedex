import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { useTheme } from "@/theme";
import { Brand } from "@/components/molecules";
import { SafeScreen } from "@/components/template";

import type { ApplicationScreenProps } from "@/types/navigation";
import { TextBase, TextL, TextM } from "@/components/derivatives/text";
import { generateFontColors } from "@/theme/fonts";

function Startup({ navigation }: ApplicationScreenProps) {
  const { layout } = useTheme();

  const { isSuccess, isFetching, isError } = useQuery({
    queryKey: ["startup"],
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

export default Startup;
