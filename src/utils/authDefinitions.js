import { toast } from "react-hot-toast";

export const NETWORK_STATE = {
    SUCCESS: "SUCCESS",
    LOADING: "LOADING",
    IDLE: "IDLE",
    ERROR: "ERROR",
  };

  export const alertSuccess = (message) => {
    toast.success(message);
  };
  
  export const alertError = (message) => {
    toast.error(message);
  };

  export const containsSpecialChars = (password) => {
    const specialChars = /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/;
    return specialChars.test(password);
  };