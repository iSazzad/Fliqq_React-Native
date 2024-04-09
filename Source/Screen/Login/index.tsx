import React, { useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Alert,
  ImageBackground,
  Image,
  StyleSheet,
} from "react-native";
import Color from "../../Constant/Color";
import { GlobalStyle } from "../../Constant/GlobalStyle";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import { useAuth } from "../../Constant/AuthContext";
import Responsive from "../../Constant/Responsive";
import Images from "../../Constant/Images";
import { ApiURL } from "../../APIViewModel/APIConfig";
import { headers, } from "../../APIViewModel/APIManager";
import {APIServiceManager } from "../../APIViewModel/APIServiceManager";

const Login = () => {
  const auth = useAuth();
  useEffect(
    () =>
      GoogleSignin.configure({
        iosClientId:
          "354802365630-1gtudj598gl23ls9n1jmhgcsk6amqqkn.apps.googleusercontent.com",
        scopes: ["profile", "email"],
        offlineAccess: false,
      }),
    []
  );

  const continueGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userDetails = await GoogleSignin.signIn();
      const { idToken } = await GoogleSignin.getTokens();

      if (userDetails && idToken) {
        console.log("id token:", idToken);
        CallLoginAPI(idToken)
        // auth.updateUserData({ token: idToken });
      }
    } catch (error) {
      console.log("some other error happened", error);
    }
  };

  const continueApple = async () => {
    if (appleAuth.isSupported) {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      );
      const { identityToken } = appleAuthRequestResponse;
      console.log("new identityToken: ", identityToken);

      if (identityToken) {
        console.log("identityToken:", identityToken);
        auth.updateUserData({ token: identityToken });
      }
      if (credentialState === appleAuth.State.AUTHORIZED) {
      }
    } else {
      Alert.alert("Not support Login with apple this device");
    }
  };

  const CallLoginAPI = (idToken:any) => {
      APIServiceManager.post(ApiURL.LoginModule.googleLogin, { idToken: idToken}, headers).then((data: any) => {
        console.log("id token data:", data);
        if (data && data?.data && data?.data?.data ) {
          console.log("id token data1:", data?.data?.data);
          auth.updateUserData(data?.data?.data)         
        }
      });
  };

  return (
    <View style={style.container}>
      <ImageBackground style={style.containerImageBg} source={Images.loginBG}>
        <Image style={style.logoImage} source={Images.loginLogo} />
        <View style={{ flex: 1 }} />
        <Text style={style.logInText}>Log In With</Text>

        <View style={style.containerBottomIcon}>
          <TouchableOpacity
            // activeOpacity={0.5}
            onPress={() => {
              continueGoogle();
            }}
            style={style.iconContainer}
          >
            <Image style={style.iconImage} source={Images.googleLogo} />
          </TouchableOpacity>

          {Platform.OS == "ios" && (
            <TouchableOpacity
              // activeOpacity={0.8}
              onPress={() => {
                continueApple();
              }}
              style={style.iconContainer}
            >
              <Image style={style.iconImage} source={Images.appleLogo} />
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;

export const style = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  containerImageBg: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
  },
  logoImage: {
    justifyContent: "center",
    alignSelf: "center",
    resizeMode: "center",
  },
  logInText: {
    color: Color.themeGreen,
    textAlign: "center",
    ...GlobalStyle.H1,
    fontWeight: "700",
    marginTop: Responsive.hp(1),
  },
  containerBottomIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Responsive.hp(1),
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: Responsive.hp(1),
  },
  iconImage: {
    justifyContent: "center",
    alignSelf: "center",
    resizeMode: "contain",
    width: Responsive.hp(5),
    height: Responsive.hp(5),
  },
});
