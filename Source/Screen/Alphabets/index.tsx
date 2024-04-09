import React, { useEffect, useState } from "react";
import {
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
import { SvgUri } from "react-native-svg";
import Icons from "../../Constant/Icons";
import { BouncingBlock } from "../../Component/BouncingBlock";
import { useAuth } from "../../Constant/AuthContext";
import { BaseUrl } from "../../APIViewModel/APIConfig";
import { TextToSpeechPlay } from "../../Component/TextToSpeech";

const Alphabets = ({ navigation }: any) => {
  const auth = useAuth()
  const [isVisible, setIsVisible] = useState(false);
  const [viewImage, setViewImage] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<any>();
  const [selectedSubItem, setSelectedSubItem] = useState<any>();

  useEffect(() => {
    setSelectedItem(auth.alphabets[0])
    setSelectedSubItem(auth.alphabets[0]?.data[0])
    showCharacter(auth.alphabets[0])
  }, []);

  const renderItem = (item: any) => {
    return (
      <TouchableOpacity
        style={{
          width: Responsive.hp(13),
          height: Responsive.hp(13),
          marginHorizontal: Responsive.hp(1),
          marginBottom: Responsive.hp(2),
          alignSelf: "center",
          shadowColor: "grey",
          backgroundColor: Color.white,
          shadowOpacity: 0.5,
          shadowOffset: {
            width: 5,
            height: 5
          },
          shadowRadius: 5,
          borderRadius: Responsive.hp(1)
        }}
        onPress={() => {
          setSelectedSubItem(item.item)
          let textStr = selectedItem?.alpha_character.toLowerCase() + " for " + item?.item?.name
          TextToSpeechPlay(textStr)
        }}
      >
        <View
          style={{
            width: Responsive.hp(13),
            height: Responsive.hp(10),
            alignItems: "center",
            justifyContent: "center",
            borderRadius: Responsive.hp(1)
          }}
        >
          <SvgUri
            width="75%"
            height="75%"
            style={{ alignSelf: "center" }}
            uri={appendFileServerPath(item?.item?.image_url)}
          />
        </View>

        <View
          style={{
            width: Responsive.hp(13),
            height: Responsive.hp(3),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: selectedItem.color_code,
            borderEndStartRadius: Responsive.hp(1),
            borderEndEndRadius: Responsive.hp(1),
          }}
        >
          <Text style={{ ...GlobalStyle.H1, color: Color.white }}>{item?.item?.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const renderSideMenuItem = (item: any) => {
    const path = BaseUrl + item?.item?.svg_url

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity style={{
          width: "100%",
          height: "100%"
        }} onPress={() => {
          showCharacter(item.item)
        }}>
          <SvgUri
            width="100%"
            height="100%"
            uri={path}
          />
        </TouchableOpacity>
      </View>
    )
  }

  const showCharacter = (element: any) => {
    const path = BaseUrl + element?.svg_url
    setSelectedSubItem(element.data[0]);
    setSelectedItem(element);
    setViewImage(path);
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 200);
  }

  const appendFileServerPath = (path: any) => {
    return BaseUrl + path
  }

  const itemListData = () => {
    let newItem: any[] = []
    selectedItem?.data.forEach(element => {
      if (selectedSubItem?.name !== element?.name) {
        newItem.push(element)
      }
    });
    return newItem
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.containerBGImage}
        source={Images.splashImage}
      >
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={{ width: "100%", height: "100%" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.goBack();
              }}
              style={{ ...styles.menuContainer }}
            >
              <Image style={styles.menuIcon} source={Images.backArrow} />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "column",
                flex: 1,
              }}
            >
              <View
                style={{
                  width: Responsive.hp(18),
                  height: Responsive.hp(18),
                  marginTop: Responsive.hp(3),
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {isVisible && <BouncingBlock image={viewImage} height={Responsive.hp(8)} />}
              </View>
              <Text
                style={{
                  ...GlobalStyle.T1,
                  color: selectedItem?.color_code,
                  marginTop: Responsive.hp(2),
                  alignSelf: "center",
                }}
              >
                {selectedItem?.alpha_character + " = " + selectedSubItem?.name}
              </Text>
              <View
                style={{
                  width: Responsive.hp(9),
                  height: Responsive.hp(9),
                  marginTop: Responsive.hp(2),
                  alignSelf: "center",
                  shadowColor: "grey",
                  shadowOpacity: 0.5,
                  shadowOffset: {
                    width: 5,
                    height: 5,
                  },
                  shadowRadius: 5
                }}
              >
                <SvgUri
                  width="100%"
                  height="100%"
                  style={{ alignSelf: "center" }}
                  uri={appendFileServerPath(selectedSubItem?.image_url)}
                />
              </View>
              <TouchableOpacity
                style={{
                  width: Responsive.hp(6),
                  height: Responsive.hp(6),
                  marginVertical: Responsive.hp(3),
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: Color.white,
                  borderRadius: Responsive.hp(1),
                  shadowColor: "grey",
                  shadowOpacity: 0.5,
                  shadowOffset: {
                    width: 5,
                    height: 5,
                  },
                  shadowRadius: 5
                }}
                onPress={() => {
                  TextToSpeechPlay(selectedItem?.alpha_character.toLowerCase())
                }}
              >
                {Icons.soundIcon}
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <FlatList
                  numColumns={2}
                  data={itemListData()}
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ borderRadius: Responsive.hp(2), justifyContent: "center", alignItems: "center" }}
                  style={{}}
                />
              </View>
            </View>
          </View>

        </SafeAreaView>
        <View
          style={{
            width: "30%",
            height: "100%",
            backgroundColor: Color.lightPink,
            borderTopLeftRadius: Responsive.hp(4),
            borderBottomLeftRadius: Responsive.hp(4),
            paddingTop: Responsive.hp(5),
            paddingBottom: Responsive.hp(2)
          }}
        >
          <FlatList
            numColumns={1}
            data={auth.alphabets}
            renderItem={renderSideMenuItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              marginVertical: Responsive.hp(1),
            }}
            style={{ height: "100%", width: "100%", }}
          />
        </View>
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

export default Alphabets;
