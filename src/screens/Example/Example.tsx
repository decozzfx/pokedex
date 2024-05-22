import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import { ImageVariant } from "@/components/atoms";
import { Brand } from "@/components/molecules";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { fetchOne } from "@/services/users";

import { isImageSourcePropType } from "@/types/guards/image";

import SendImage from "@/theme/assets/images/send.png";
import ColorsWatchImage from "@/theme/assets/images/colorswatch.png";
import TranslateImage from "@/theme/assets/images/translate.png";
import styles from "./styles";

function Example() {
  const { t } = useTranslation(["example", "welcome"]);

  const {
    colors,
    variant,
    changeTheme,
    layout,
    gutters,
    fonts,
    components,
    backgrounds,
  } = useTheme();

  const [currentId, setCurrentId] = useState(-1);

  const { isSuccess, data, isFetching } = useQuery({
    queryKey: ["example", currentId],
    queryFn: () => {
      return fetchOne(currentId);
    },
    enabled: currentId >= 0,
  });

  useEffect(() => {
    if (isSuccess) {
      Alert.alert(t("example:welcome", data.name));
    }
  }, [isSuccess, data]);

  const onChangeTheme = () => {
    changeTheme(variant === "default" ? "dark" : "default");
  };

  const onChangeLanguage = (lang: "fr" | "en") => {
    void i18next.changeLanguage(lang);
  };

  if (
    !isImageSourcePropType(SendImage) ||
    !isImageSourcePropType(ColorsWatchImage) ||
    !isImageSourcePropType(TranslateImage)
  ) {
    throw new Error("Image source is not valid");
  }

  return (
    <SafeScreen>
      <View style={styles.container}>
        <Text style={{ fontSize: 32, color: "black" }}>Selamat Datang</Text>
        <Text style={{ fontSize: 28, color: "black", top: 8 }}>
          Aplikasi Nexa
        </Text>
        <Text style={{ fontSize: 15, color: "gray" }}>(Sukolilo Presensi)</Text>
        <Text
          style={{
            fontSize: 15,
            marginTop: 32,
            color: "gray",
          }}
        >
          Silakan Login Menggunakan Akun Anda
        </Text>
      </View>
    </SafeScreen>
  );
}

export default Example;
