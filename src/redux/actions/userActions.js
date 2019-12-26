import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => async dispatch => {
  try {
    dispatch({ type: LOADING_UI });
    const { data } = await axios.post("/login", userData);
    setAuthorizationHeader(data.token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push("/");
  } catch (error) {
    console.error(error);
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const signupUser = (newUserData, history) => async dispatch => {
  try {
    dispatch({ type: LOADING_UI });
    const { data } = await axios.post("/signup", newUserData);
    setAuthorizationHeader(data.token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push("/");
  } catch (error) {
    console.error(error);
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("FbIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => async dispatch => {
  try {
    dispatch({ type: LOADING_USER });
    const { data } = await axios.get("/user");
    dispatch({ type: SET_USER, payload: data });
  } catch (error) {
    console.error(error);
    dispatch({ type: SET_ERRORS, payload: error });
  }
};

export const uploadImage = formData => async dispatch => {
  dispatch({ type: LOADING_USER });
  try {
    await axios.post("/user/image", formData);
    dispatch(getUserData());
  } catch (error) {
    console.error(error);
  }
};

export const editUserDetails = userDetails => async dispatch => {
  try {
    dispatch({ type: LOADING_USER });
    await axios.post("/user", userDetails);
    dispatch(getUserData());
  } catch (error) {
    console.error(error);
  }
};

function setAuthorizationHeader(token) {
  const fbIdToken = `Bearer ${token}`;
  localStorage.setItem("FbIdToken", fbIdToken);
  axios.defaults.headers.common["Authorization"] = fbIdToken;
}
