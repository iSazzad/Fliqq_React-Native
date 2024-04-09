import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Color from "../../Constant/Color";
import { GlobalStyle } from "../../Constant/GlobalStyle";
import { BouncingBlock } from "../../Component/BouncingBlock";
import { isPortrait } from "../../Constant/Constant";
import { useOrientation } from "../../Constant/useOrientation";
import Responsive from "../../Constant/Responsive";

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

// "0","1", "2","3","4","5","6","7","8","9"

const Dashboard = ({ navigation }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [character, setCharacter] = useState("");
  const [portrait, setPortrait] = useState(true);
  const [colors, setColors] = useState<string[]>([]);
  const [color, setColor] = useState<string>("");

  const showCharacter = (element: any) => {
    setCharacter(element);
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 200);
  }

  useEffect(() => {
    Dimensions.addEventListener('change', ({window:{width,height}})=>{
      if (width<height) {
        console.log("PORTRAIT");
        setPortrait(true)
      } else {
        console.log("LANDSCAPE");
        setPortrait(false)
      }
    })
    const color_arry = getColorArry()
    setColors(color_arry)
    console.log("new colors : ", colors);
    
    
  }, [])

  function getColorArry() {
    let color: string[] = []
    character_arry.map((element, index) => {
      color.push(getRandomColor())
    })
    return color
  }
  
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor:"white" }}>
      
      <View style={{ flexDirection: portrait ? "column":"row", flex: 1 }}>
        <View style={{ ...styles.container}}>
          <View
            style={{
              width: 300,
              height: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isVisible && <BouncingBlock char={character} color={color} />}
          </View>
        </View>
        <View style={{
            ...styles.container,
            justifyContent: "center",
            alignSelf: "center", 
            flex:1, 
          }}>
        <View
          style={{
            ...styles.container,
            
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
            alignSelf: "center",
            padding:10,            
          }}
        >
          {character_arry.map((element, index) => {
            return (
              <View key={element}>
                <TouchableOpacity
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: colors[index],
                    borderRadius: 30,
                    marginHorizontal:10,
                    marginBottom: 10,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={() => {
                    showCharacter(element)
                    setColor(colors[index])
                  }}
                >
                  <Text style={{color:"white", fontSize: 20, fontWeight:"600", fontStyle:"italic"}}>{element}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        </View>
        
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.toggleDrawer();
        }}
        style={{
          height: 50,
          width: 50,
          backgroundColor: Color.themeLayoutGrey,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          left:20,
          top: portrait ? 40:15,
          position: "absolute"
        }}
      >
        <Text
          style={{
            color: Color.themeDarkBlue,
            textAlign: "center",
            ...GlobalStyle.H3_M,
            fontWeight: "500",
          }}
        >
          ***
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
});

export default Dashboard;
