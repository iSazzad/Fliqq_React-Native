import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DrawerParamsListProps,
} from "./types";

import SideMenu from "../Screen/View/SideMenu";
import Routes from "./Routes";
import Dashboard from "../Screen/Dashboard";
import Player from "../Screen/Extra/Player";
import Alphabets from "../Screen/View/Alphabets";
import Numbers from "../Screen/Numbers";
import { Settings } from "../Screen/Settings";

const Drawer = createDrawerNavigator<DrawerParamsListProps>();

const DrawerNavigation = ({ navigation }: any) => {
  console.log("DrawerNavigation");
  let drawerData: { name: any; component: any }[] = [
    { name: Routes.Dashboard, component: Dashboard },
    { name: Routes.Alphabets, component: Alphabets },
    { name: Routes.Settings, component: Settings },
    { name: Routes.Numbers, component: Numbers },
  ];
  return (
    <Drawer.Navigator
      initialRouteName="DashBoardParamList"
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerStyle: { width: "70%" },
        swipeEnabled: false
      }}
      drawerContent={() => <SideMenu />}
    >
      {drawerData.map((item, index) => {
        return (
          <Drawer.Screen
            key={index}
            name={item.name}
            component={item.component}
          />
        );
      })}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
