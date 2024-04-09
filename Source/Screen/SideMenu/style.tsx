import { StyleSheet } from "react-native";
import Color from "../../Constant/Color";
import Responsive from "../../Constant/Responsive";
import { GlobalStyle } from "../../Constant/GlobalStyle";

export const style = StyleSheet.create({
    container:{ flex: 1},
    avatarContainer:{
      height: Responsive.hp(15),
      width: Responsive.hp(15),
      borderRadius: Responsive.hp(8),
      borderColor: Color.themeGreen,
      borderWidth: 3,
      backgroundColor: Color.lightPink,
      justifyContent:"center",      
    },
    avatarTextContainer:{
      color: Color.themeGreen,
      ...GlobalStyle.XXT,
      alignSelf:"center",
      textAlign:"center",
    },
    listContainer:{ flex: 1, backgroundColor: Color.white },
    listItemContainer:{
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
    },
    separatorContainer:{
      height: 1,
      backgroundColor: Color.whiteGrey60,
      width: "100%",
      position: "absolute",
      bottom: 0,
    }
  });