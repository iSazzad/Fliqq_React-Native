import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Color from "./Color";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Responsive from "./Responsive";

export default {
  menuIcon: (
    <MaterialIcons
      name="menu"
      size={Responsive.hp(3)}
      color={Color.black}
    />
  ),
  playIcon: (
    <MaterialIcons
      name="play-circle-outline"
      size={Responsive.hp(4)}
      color={Color.black}
    />
  ),
  nextIcon: (
    <MaterialIcons
      name="chevron-right"
      size={Responsive.hp(4)}
      color={Color.black}
    />
  ),
  pauseIcon: (
    <MaterialIcons
      name="pause-circle-outline"
      size={Responsive.hp(4)}
      color={Color.black}
    />
  ),
  soundIcon: (
    <Ionicons
      name="ios-volume-high-outline"
      size={Responsive.hp(4)}
      color={Color.black}
    />
  ),
  muteSoundIcon: (
    <Ionicons
      name="volume-mute-outline"
      size={Responsive.hp(4)}
      color={Color.black}
    />
  ),
  
};
