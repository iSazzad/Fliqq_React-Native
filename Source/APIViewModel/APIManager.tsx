import {
  errorValidation,
  RequestType,
} from "./APIServiceManager";
import Toast from "react-native-root-toast";
import { ToastStyle } from "../Constant/GlobalStyle";
import axios from "axios";
export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "",
};

export const APIManager = (data: any, type: RequestType, formData:Boolean = false) => {
  return new Promise(async (resolve, reject) => {
    const axios = require("axios");
    let bodyData = JSON.stringify(data.body);

    let config = {
      method: type,
      maxBodyLength: Infinity,
      url: data.url,
      headers: {},
      timeout: formData ? 120000:15000,
      data: formData ? data.body:bodyData,
    };

    if (data.header != null) {
      config.headers = data.header;
    }

    if (data.header != null) {
      config.headers = data.header;
    }

    console.log("request data config: ",config);
    axios
      .request(config)
      .then((response: any) => {
        errorValidation(response.data.data, response.data.status).then(
          (data) => {
            console.log("request data config1: ",data);
            resolve(data);
          }
        );
      })
      .catch((error: any) => {
        // console.log("call 123: ", error.response);
        if (error.response != undefined) {
          let errorData = null;
          if (error.response.data != null) {
            errorData = error.response.data;
          }
          errorValidation(errorData, error.response.status).then((data: any) => {
            console.log("request data config: ",data);
            if (data.status == 5) {
              Toast.show(data.message, ToastStyle);
              resolve(null);
            }else {
              resolve(data);
            }
          });
        } else {
          resolve(null);
        }
      });
  });
};