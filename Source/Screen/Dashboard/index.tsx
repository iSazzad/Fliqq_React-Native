import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Images from "../../Constant/Images";
import { GlobalStyle } from "../../Constant/GlobalStyle";
import Responsive from "../../Constant/Responsive";
import Color from "../../Constant/Color";

const character_arry = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const Dashboard = ({ navigation }: any) => {
  const [portrait, setPortrait] = useState(true);

  const arry = [
    { name: "Alphabets", image: Images.alphabets, id: 0 },
    { name: "Numbers", image: Images.numbers, id: 1 },
  ];

  useEffect(() => {
    Dimensions.addEventListener("change", ({ window: { width, height } }) => {
      if (width < height) {
        console.log("PORTRAIT");
        setPortrait(true);
      } else {
        console.log("LANDSCAPE");
        setPortrait(false);
      }
    });
  }, []);

  const renderItem = (item: any) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.navigate(item.item.name, {});
        }}
      >
        <Image style={styles.imageContainer} source={item.item.image} />
        <Text style={styles.textContainer}>{item.item.name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.containerBGImage}
        source={Images.splashImage}
      >
        <SafeAreaView style={styles.safeAreaContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.toggleDrawer();
            }}
            style={{ ...styles.menuContainer }}
          >
            <Image style={styles.menuIcon} source={Images.sideMenu} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: portrait ? "column" : "row",
              flex: 1,
              paddingTop: Responsive.hp(1),
            }}
          >
            <FlatList
              numColumns={1}
              data={arry}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: "center",
                marginVertical: Responsive.hp(1),
              }}
              style={{ height: "100%", width: "100%", }}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  containerBGImage: {
    height: "100%",
    width: "100%",
  },
  menuContainer: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginLeft: 20,
  },
  menuIcon: {
    width: 40,
    height: 40,
  },
  safeAreaContainer: { width: "100%", height: "100%" },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Responsive.hp(2),
  },
  imageContainer: { width: Responsive.hp(30), height: Responsive.hp(30) },
  textContainer: {
    ...GlobalStyle.T1,
    paddingVertical: Responsive.hp(0.5),
    color: Color.themeGreen,
  },
});

export default Dashboard;
