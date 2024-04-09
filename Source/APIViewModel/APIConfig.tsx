export const production = true;
export const BaseUrl = production ? 
  "https://fliqqapi.onrender.com/":"http://ec2-3-139-240-88.us-east-2.compute.amazonaws.com/";


export const ApiURL = {
  LoginModule: {
    googleLogin: BaseUrl + "google-login",
  },
  GeneralModule:{
    alphabetsList: BaseUrl + "alphabets-list"
  },
};