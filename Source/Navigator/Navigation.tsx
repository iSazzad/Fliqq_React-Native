/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useIsFocused,
} from "@react-navigation/native";
import * as React from "react";
import { AuthProvider, useAuth } from "../Constant/AuthContext";
import DrawerNavigation from "./DrawerNavigation";
import NavigationService from "./NavigationService";
import StackNavigation from "./StackNavigation";

export default function Navigation() {
  const NewDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };

  React.useEffect(() => {}, [useIsFocused]);

  return (
    <NavigationContainer
      ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
      // linking={LinkingConfiguration}
      theme={NewDefaultTheme}
    >
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}

function RootNavigator() {
  const auth = useAuth();

  console.log("loginRedirect : ", auth.userLoginStatus());
  return auth.userLoginStatus() ? <DrawerNavigation /> : <StackNavigation />;
}
