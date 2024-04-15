import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginParamsList } from "./types";
import Login from "../Screen/Login";
import Routes from "./Routes";
import Splash from "../Screen/View/Splash";

const Stack = createStackNavigator<LoginParamsList>();
export default function StackNavigation() {
  let stackData: { name: any; component: any }[] = [
    { name: Routes.Splash, component: Splash },
    { name: Routes.Login, component: Login },
  ];

  return (
    <>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        {stackData.map((item, index) => {
          return (
            <Stack.Screen
              key={index}
              name={item.name}
              component={item.component}
            />
          );
        })}
      </Stack.Navigator>
    </>
  );
}
