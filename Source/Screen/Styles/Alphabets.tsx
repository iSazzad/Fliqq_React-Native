import { StyleSheet } from "react-native";
import Responsive from "../../Constant/Responsive";
import { GlobalStyle } from "../../Constant/GlobalStyle";
import Color from "../../Constant/Color";

export const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
    },
    containerBGImage: {
        height: "100%",
        width: "100%",
        flexDirection: "row"
    },
    menuContainer: {
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginLeft: 10,
    },
    menuIcon: {
        width: 40,
        height: 40,
    },
    safeAreaContainer: { width: "70%", height: "100%", flexDirection: "row" },
    itemContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: Responsive.hp(2),
        width: Responsive.wp(22),
        height: Responsive.wp(22),
    },
    imageContainer: { width: Responsive.hp(30), height: Responsive.hp(30) },
    textContainer: {
        ...GlobalStyle.T1,
        paddingVertical: Responsive.hp(0.5),
        color: Color.themeGreen,
    },
});
