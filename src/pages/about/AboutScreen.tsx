import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { DetailLayout } from "@components";
import { color, constant, theme } from "@utils";
import { Text } from "@ui-kitten/components";

const AboutScreen = () => {
  return (
    <DetailLayout title="About">
      <View style={styles.container}>
        <Text style={styles.text}>This is Pokemon Apps.</Text>
      </View>
    </DetailLayout>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    padding: constant.container,
  },
  text: {
    lineHeight: 23,
  },
  link: {
    color: color.primary,
    ...theme.fontMedium,
  },
});
