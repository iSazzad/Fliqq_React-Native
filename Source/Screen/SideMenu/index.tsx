import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Color from "../../Constant/Color";
import Responsive from "../../Constant/Responsive";
import Images from "../../Constant/Images";
import { GlobalStyle } from "../../Constant/GlobalStyle";
import Routes from "../../Navigator/Routes";
import NavigationService from "../../Navigator/NavigationService";
import { style } from "./style";
import { useAuth } from "../../Constant/AuthContext";
import { ScrollView } from "react-native-gesture-handler";
import { CharacterImageName } from "../../Constant/Constant";

const SideMenu = ({ onTapList }: any) => {
  const [select, setSelect] = useState(-1);
  let auth = useAuth();

  useEffect(() => { }, []);

  const drawerItem: {
    index: number;
    title: string;
    navigationLink: string;
  }[] = [
      {
        index: 0,
        title: "Learning",
        navigationLink: "",
      },
      {
        index: 1,
        title: "Setting",
        navigationLink: "",
      },
      {
        index: 10,
        title: "Log Out",
        navigationLink: "",
      },
    ];

  const onPressAction = (item: any) => {
    setSelect(item.index);
    if (item.index == 0) {
      NavigationService.navigateToNext(Routes.Dashboard, {});
    } else if (item.index == 1) {
      NavigationService.navigateToNext(Routes.Settings, {});
    } else if (item.index == 2) {
      NavigationService.navigateToNext(Routes.Player, {});
    } else if (item.index == 10) {
      Alert.alert("Logout", "Are you sure You want to logout the App?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => auth.signOut(),
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: "center",
            marginVertical: Responsive.hp(1),
          }}
        >
          <TouchableOpacity
            activeOpacity={0.95}
            onPress={() => {
              // NavigationService.navigateToNext(Routes.MyProfile, { data: {} });
            }}
            style={style.avatarContainer}
          >
            {
              <Text style={style.avatarTextContainer}>
                {CharacterImageName()}
              </Text>
            }
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: Responsive.hp(2),
            }}
          >
            <Text style={{ ...GlobalStyle.H2, color: Color.black }}>
              {(auth.authData?.first_name) + " " + auth.authData?.last_name}
            </Text>
            <Text
              style={{ ...GlobalStyle.H3, color: Color.themeGreen }}
            >
              {auth.authData?.email}
            </Text>
          </View>
        </View>
        <View style={style.listContainer}>
          {drawerItem.map((item: any, index:any) => {
            return (
              <View
                style={style.listItemContainer}
                key={index}
              >
                <TouchableOpacity
                  style={{ width: "100%", height: "100%", }}
                  onPress={() => {
                    onPressAction(item);
                  }}
                >
                  <Text
                    style={{
                      padding: 20,
                      ...GlobalStyle.H3,
                      color:
                        Color.themeGreen
                    }}
                  >
                    {item.title}
                  </Text>
                  <View style={style.separatorContainer} />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SideMenu;
