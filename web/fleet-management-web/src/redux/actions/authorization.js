import axios from "axios";
import { API_URL } from "../../utils/constans";
import { getCookie, setCookie, removeCookie } from "../../utils/cookies";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const VERIFY_USER = "VERIFY_USER";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
export const VERIFY_ERROR = "VERIFY_ERROR";

export const loginUser = (mail, password) => (dispatch) => {
  dispatch(requestLogin());
  axios
    .post(`${API_URL}/authentication/login`, {
      email: mail,
      password: password,
    })
    .then((res) => {
      const user = res.data.result;
      setCookie("auth_token", user.token, 1);
      dispatch(receiveLogin(user));
    })
    .catch((error) => {
      console.log(error);
      dispatch(loginError());
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  removeCookie("auth_token");
  dispatch(receiveLogout());
};

export const verifyAuth = () => (dispatch) => {
  dispatch(verifyUser());
  const token = getCookie("auth_token");
  console.log("tauth_tokenoken");
  console.log(token);
  axios
    .post(`${API_URL}/authentication/verify_token`, {
      token: token,
    })
    .then((res) => {
      const result = res.data.result;
      if (result === null) {
        dispatch(verifyError());
        return;
      }
      dispatch(verifySuccess(result));
    })
    .catch((error) => {
      console.log(error);
      dispatch(verifyError());
    });
};

const requestLogin = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const receiveLogin = (user) => {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
};

const loginError = () => {
  return {
    type: LOGIN_ERROR,
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

const logoutError = () => {
  return {
    type: LOGOUT_ERROR,
  };
};

const verifyUser = () => {
  return {
    type: VERIFY_USER,
  };
};

const verifySuccess = (user) => {
  return {
    type: VERIFY_SUCCESS,
    user,
  };
};

const verifyError = () => {
  return {
    type: VERIFY_ERROR,
  };
};
