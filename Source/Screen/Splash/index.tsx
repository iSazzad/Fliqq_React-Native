import { View, StyleSheet, ImageBackground, Image } from "react-native";
import React, { useEffect } from "react";
import Routes from "../../Navigator/Routes";
import Images from "../../Constant/Images";

const Splash = ({ navigation }: any) => {

  useEffect(() => {
    const nextScreen = () => {
      setTimeout(async () => {
        navigation.navigate(Routes.Login);
      }, 3000);
    };

    nextScreen();
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={style.containerBGImage}
        source={Images.splashImage}
      >
      <Image
          style={style.logoImage}
          source={Images.splashLogo}
        />
      </ImageBackground>
    </View>
  );
};

export const style = StyleSheet.create({
  containerBGImage: {
    height: "100%",
    width: "100%",
    justifyContent:"center",
    alignSelf:"center"
  },
  logoImage: {
    justifyContent:"center",
    alignSelf:"center",
    resizeMode:"center",
  },
});

export default Splash;
