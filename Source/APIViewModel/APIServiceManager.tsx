import axios from "axios";
import Toast from "react-native-root-toast";
import { ToastStyle } from "../Constant/GlobalStyle";

// API Service Manager Methods
export const APIServiceManager = {
  get: (apiUrl: any, headers: any) => {
    const config = { headers };
    return new Promise(async (resolve, reject) => {
      axios.get(apiUrl, config).then((data) => {
        responseModification(1, data).then(finalData =>{
          resolve(finalData)
        })
      }).catch(error => {
        responseModification(0, error).then(finalData =>{
          resolve(finalData)
        })
      })
    })
  },
  post: (apiUrl: any, data: any, headers = {}) => {
    const config = { headers };
    return new Promise(async (resolve, reject) => {
      axios.post(apiUrl, data, config).then((data) => {
        responseModification(1, data).then(finalData =>{
          resolve(finalData)
        })
      }).catch(error => {
        responseModification(0, error).then(finalData =>{
          resolve(finalData)
        })
      })
    })
  },
  put: (apiUrl: any, data: any, headers = {}) => {
    const config = { headers };
    return new Promise(async (resolve, reject) => {
      axios.put(apiUrl, data, config).then((data) => {
        responseModification(1, data).then(finalData =>{
          resolve(finalData)
        })
      }).catch(error => {
        responseModification(0, error).then(finalData =>{
          resolve(finalData)
        })
      })
    })
  },
  delete: (apiUrl: any, headers = {}) => {
    const config = { headers };
    return new Promise(async (resolve, reject) => {
      axios.delete(apiUrl, config).then((data) => {
        responseModification(1, data).then(finalData =>{
          resolve(finalData)
        })
      }).catch(error => {
        responseModification(0, error).then(finalData =>{
          resolve(finalData)
        })
      })
    })
  },
};

export const responseModification = (type: any, response: any) => {
  return new Promise((resolve, reject) => {
    if (type == 1) {
      errorValidation(response.data.data, response.status).then(
        (data) => {
          console.log("request data config1: ",data);
          resolve(data);
        }
      );
    }else {
      if (response.response != undefined) {
        let errorData = null;
        if (response.response.data != null) {
          errorData = response.response.data;
        }
        errorValidation(errorData, response.response.status).then((data: any) => {
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
    }
  })
  
}

// Error Validation Methods
export const errorValidation = (res: any, code: any) => {
  console.log("Response data is-->", res, code);
  return new Promise((resolve, reject) => {
    switch (code) {
      case ApiResponseCode.success:
        if (res) {
          resolve({ message: "data get successfully", status: 1, data: res });
        } else {
          console.log("Response status");
          resolve({ status: 10, data: null });
        }

        break;
      case ApiResponseCode.BadRequest:
        let msg = "Bad Request";
        if (res.message != null) {
          if (Array.isArray(res.message) && res.message.length > 0) {
            msg = res.message[0];
          }
        }
        resolve({ message: msg, status: 0 });
        break;
      case ApiResponseCode.Unauthorized:
        let msgValidation1 = "Unauthorized user";
        if (res.message) {
          if (Array.isArray(res.message) && res.message.length > 0) {
            msgValidation1 = res.message[0];
          } else {
            msgValidation1 = res.message;
          }
          resolve({ message: msgValidation1, status: 5 });
        } else {
          resolve({ message: msgValidation1, status: 0 });
        }
        break;
      case ApiResponseCode.NotFound:
        resolve({ message: "data not found", status: 0 });
        break;
      case ApiResponseCode.Validation || ApiResponseCode.FieldValidation:
        let msgValidation = "Validation Error";
        if (res.emailNumber_exists != null) {
          if (Array.isArray(res.message) && res.message.length > 0) {
            msgValidation = res.message[0];
          } else {
            msgValidation = res.message;
          }
          resolve({ message: msgValidation, status: 2, data: null });
        } else if (res.message != null) {
          if (Array.isArray(res.message) && res.message.length > 0) {
            msgValidation = res.message[0];
          } else {
            msgValidation = res.message;
          }
          resolve({ message: msgValidation, status: 5 });
        } else {
          resolve({ message: msgValidation, status: 0 });
        }

        break;
      default:
        break;
    }
  });
};

// Api Response Code
export enum ApiResponseCode {
  success = 200,
  created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  Validation = 403,
  FieldValidation = 422,
}

export enum RequestType {
  get = "get",
  post = "post",
  put = "put",
  delete = "delete",
}
