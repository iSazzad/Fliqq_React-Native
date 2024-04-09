import { CommonActions } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigateAndReset() {
  _navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: "DrawerNavigation" }],
    })
  );
}

function navigateToNext(name, data) {
  _navigator.navigate(name, data);
}

function navigateToBack() {
  _navigator.goBack();
}

function navigateToOpenDrawer() {
  _navigator.openDrawer();
}

function navigateToCloseDrawer() {
  _navigator.dispatch(
    DrawerActions.closeDrawer()
  )
}

function navigateToToggleDrawer() {
  _navigator.dispatch(
    DrawerActions.toggleDrawer()
  )
}

export default {
  setTopLevelNavigator,
  navigateAndReset,
  navigateToNext,
  navigateToOpenDrawer,
  navigateToCloseDrawer,
  navigateToToggleDrawer,
  navigateToBack
};
