import { SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST } from "../types";
import axios from "axios";

export const getPosts = () => async dispatch => {
  try {
    dispatch({ type: LOADING_DATA });
    const { data } = await axios.get("/posts");
    dispatch({ type: SET_POSTS, payload: data });
  } catch (error) {
    console.error(error);
    dispatch({ type: SET_POSTS, payload: [] });
  }
};

export const likePost = postId => async dispatch => {
  try {
    const { data } = await axios.get(`/post/${postId}/like`);
    dispatch({ type: LIKE_POST, payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const unlikePost = postId => async dispatch => {
  try {
    const { data } = await axios.get(`/post/${postId}/unlike`);
    dispatch({ type: UNLIKE_POST, payload: data });
  } catch (error) {
    console.error(error);
  }
};
