import AsyncStorage from "@react-native-async-storage/async-storage";

class localStorageProvider {
  async setItemString(key: string, value: string) {
    try {
      console.log("setItemObject key: ", key, value);
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log("Error");
    }
  }

  async getItemString(key: string) {
    console.log("getItemObject key", key);
    var item = await AsyncStorage.getItem(key);
    return item;
  }

  async setItemObject(key: string, item: any) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.log("Error",error);
    }
  }

  async getItemObject(key: string) {
    // console.log("getItemObject key", key);
    var item: any = await AsyncStorage.getItem(key);
    return JSON.parse(item);
  }

  async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error:any) {
      console.log("Error " + error.value);
    }
  }

  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (error:any) {
      console.log("Error " + error.value);
    }
  }
}

export const localStorage = new localStorageProvider();
