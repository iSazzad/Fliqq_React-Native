export const emailvalidate = (text: string) => {
  let reg =
    /^([A-Za-z0-9_\-\.\+]+)@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,3})$/;
  return reg.test(text);
};
export const characterValidate = (name: string) => {
  if (name != undefined && name.length > 0) {
    console.log("check validation: ", name, name.trim());

    return name.trim().length > 0;
  }
  return false
  
};

export const lnamevalidate = (lname: string | any[]) => {
  if (lname.length > 1) {
    return true;
  } else {
    return false;
  }
};
export const passwordvalidate = (password: string) => {
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
  );
  return strongRegex.test(password);
};

export const phoneValidate = (phone: string) => {
  return phone.match("[0-9]{10}");
};

export const checkValidationConfirmPassword = (
  confirmPass: any,
  password: any
) => {
  if (password === confirmPass) {
    return "Same Password";
  } else {
    return "Different Password";
  }
};
