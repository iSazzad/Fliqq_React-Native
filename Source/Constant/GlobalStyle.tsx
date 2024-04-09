import { StyleSheet, Platform } from "react-native";
import Color from "./Color";
import Fonts from "./Fonts";
import Responsive from "./Responsive";
import Toast from "react-native-root-toast";
import PlatformType from "./PlatformType";

export const GlobalStyle = StyleSheet.create({
  containerSafeView: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    width: Responsive.width,
    paddingHorizontal: Responsive.wp(6),
  },

  T1: { fontSize: Responsive.hp(4.0), fontFamily: Fonts.Jua_Regular },
  XT: { fontSize: Responsive.hp(6.0), fontFamily: Fonts.Jua_Regular },
  XXT: { fontSize: Responsive.hp(8.0), fontFamily: Fonts.Jua_Regular },
  T2: { fontSize: Responsive.hp(3.0), fontFamily: Fonts.Jua_Regular },
  H1: { fontSize: Responsive.hp(2.0), fontFamily: Fonts.Jua_Regular },
  H2: { fontSize: Responsive.hp(1.8), fontFamily: Fonts.Jua_Regular },  
  H3: { fontSize: Responsive.hp(1.6), fontFamily: Fonts.Jua_Regular, fontWeight: "400" },  
  tabStyleNone: { display: "none" },
  tabStyleBlank: {},
});

export const ToastStyle = {
  duration: Toast.durations.SHORT,
  position: Toast.positions.CENTER,
  shadow: true,
  animation: true,
  backgroundColor: Color.white,
  textColor: Color.themeGreen,
  textStyle: { ...GlobalStyle.SubTitle },
};
