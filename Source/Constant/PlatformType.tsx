import { Platform } from "react-native";

export default {
  android: Platform.OS == "android",
  ios: Platform.OS == "ios",
};
