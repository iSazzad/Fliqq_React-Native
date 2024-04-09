import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Dimensions } from "react-native";
export default {
  wp: wp,
  hp: hp,
  width: Dimensions.get("window").width,
  itemWidth: Math.round(Dimensions.get("window").width * 1),
  contentWidth: Dimensions.get("window").width - wp(8),
};
