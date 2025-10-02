import React from "react";
import { Image, View } from "react-native";

export default function LogoHeader() {
  return (
    <View style={{ alignItems: "center", marginBottom: 8, marginTop: -200 }}>
      <Image
        source={require("../../assets/logo.png")}
        style={{ width: 220, height: 220, resizeMode: "contain" }}
      />
    </View>
  );
}
