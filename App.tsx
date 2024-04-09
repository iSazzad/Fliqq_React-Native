/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { StatusBar } from "react-native";
import Navigation from "./Source/Navigator/Navigation";
import useColorScheme from "./Source/hooks/useColorScheme";
import Color from "./Source/Constant/Color";
import { RootSiblingParent } from "react-native-root-siblings";

function App(): JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <>
      {/* {Platform.OS === "ios" && ( */}

      <RootSiblingParent>
        <StatusBar
          animated
          translucent={false}
          backgroundColor={Color.themeGreen}
          barStyle="light-content"
        />
        <Navigation />
      </RootSiblingParent>
    </>
  );
}

export default App;
