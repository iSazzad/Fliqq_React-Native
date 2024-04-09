import React, {
  FC,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";

import { localStorage } from "./localStorageProvider";
import { LocalStorageKey, LocalStrings } from "./Strings";
import { APIServiceManager } from "../APIViewModel/APIServiceManager";
import { headers } from "../APIViewModel/APIManager";
import { ApiURL } from "../APIViewModel/APIConfig";

export type AuthData = {
  token: string | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
  email: string | undefined;
  avatar: string | undefined;
  id_token: string | undefined;
};

type AuthContextData = {
  authData?: AuthData;
  signOut(): void;
  userLoginStatus(): boolean;
  updateUserData(userData: any): void;
  getAuthString(): string;
  alphabets?:any[];
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: FC = ({ children }: any) => {
  const [authData, setAuthData] = useState<AuthData>();
  const [alphabets, setAlphabets] = useState<any[]>();

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorage function.
    loadStorageData();
    callGetAlphabetsAPI();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      //Try get the data from SecureStore
      const authDataSerialized = await localStorage.getItemObject(
        LocalStorageKey.authData
      );
      if (authDataSerialized) {
        //If there are data, it's converted to an Object and the state is updated.
        const _authData: AuthData = JSON.parse(authDataSerialized);
        setAuthData(_authData);

      }

    } catch (error) {
    } finally {
      //loading finished
    }
  }

  const loginAuthData = (response: any) => {
    let authUserData: AuthData;
    let token = authData?.token ?? "";

    authUserData = {
      token: response?.token ?? token,
      email: response?.email ?? "",
      first_name: response?.first_name ?? "",
      last_name: response?.last_name ?? "",
      avatar:response?.profile_url ?? "",
      id_token:response?.id_token ?? "",
    };

    return authUserData;
  };

  const callGetAlphabetsAPI = async () => {
    let alphabetList = await localStorage.getItemObject(
      LocalStorageKey.alphabetList
    );

    // if (alphabetList) {
    //   const arrayList = JSON.parse(alphabetList);
    //   setAlphabets(arrayList);
    // } else {
      getAlphabetLists().then(async response => {
        setAlphabets(response);
        await localStorage.setItemObject(
          LocalStorageKey.alphabetList,
          JSON.stringify(response)
        );
      }).catch((error) => {
        console.log("id token error:", error);
      })
    // }
  }

  const getAlphabetLists = () => {
    return new Promise(async (resolve, reject) => {
        let authToken = getAuthString();
        let header = headers;

        if (authToken.length > 0) {
            header.Authorization = authToken;
        }

        APIServiceManager.get(ApiURL.GeneralModule.alphabetsList, headers).then((response: any) => {
            if (response && response?.data && response?.data?.data ) {
              resolve(response?.data?.data)         
            }else {
              reject(response)
            }
          });
    });
};

  const signOut = async () => {
    console.log("removed signout");
    setAuthData(undefined);
    await localStorage.removeItem(LocalStorageKey.authData);
  };

  const userLoginStatus = () => {
    return authData?.token != undefined && authData.token.length > 0;
  };

  const updateUserData = async (userData: any) => {
    let tempAuthData = loginAuthData(userData);
    setAuthData(tempAuthData);
    await localStorage.setItemObject(
      LocalStorageKey.authData,
      JSON.stringify(tempAuthData)
    );
  };

  const getAuthString = () => {
    if (
      authData != undefined &&
      authData?.token != undefined &&
      authData?.token.length > 0
    ) {
      return "Bearer " + authData?.token;
    } else {
      return "";
    }
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider
      value={{
        authData,
        signOut,
        alphabets,
        userLoginStatus,
        updateUserData,
        getAuthString,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };
