import {
    SET_POSTS,
    LOADING_DATA,
    LIKE_POST,
    UNLIKE_POST,
    DELETE_POST,
    LOADING_UI,
    SET_ERRORS,
    CLEAR_ERRORS,
    MAKE_POST,
    SET_POST,
    STOP_LOADING_UI,
    SUBMIT_COMMENT,
} from "../types"
import axios from "axios"

export const getPosts = () => async dispatch => {
    try {
        dispatch({ type: LOADING_DATA })
        const { data } = await axios.get("/posts")
        dispatch({ type: SET_POSTS, payload: data })
    } catch (error) {
        console.error(error)
        dispatch({ type: SET_POSTS, payload: [] })
    }
}

export const getPost = postId => async dispatch => {
    try {
        dispatch({ type: LOADING_UI })
        const { data } = await axios.get(`/post/${postId}`)
        dispatch({ type: SET_POST, payload: data })
        dispatch({ type: STOP_LOADING_UI })
    } catch (error) {
        console.error(error)
    }
}

export const makePost = newPost => async dispatch => {
    try {
        dispatch({ type: LOADING_UI })
        const { data } = await axios.post("/post", newPost)
        dispatch({ type: MAKE_POST, payload: data })
        dispatch(clearErrors())
    } catch (error) {
        console.error(error)
        dispatch({ type: SET_ERRORS, payload: error.response.data })
    }
}

export const likePost = postId => async dispatch => {
    try {
        const { data } = await axios.get(`/post/${postId}/like`)
        dispatch({ type: LIKE_POST, payload: data })
    } catch (error) {
        console.error(error)
    }
}

export const unlikePost = postId => async dispatch => {
    try {
        const { data } = await axios.get(`/post/${postId}/unlike`)
        dispatch({ type: UNLIKE_POST, payload: data })
    } catch (error) {
        console.error(error)
    }
}

export const deletePost = postId => async dispatch => {
    try {
        await axios.delete(`/post/${postId}`)
        dispatch({ type: DELETE_POST, payload: postId })
    } catch (error) {
        console.error(error)
    }
}

export const submitComment = (postId, commentData) => async dispatch => {
    try {
        const { data } = await axios.post(`/post/${postId}/comment`, commentData)
        dispatch({ type: SUBMIT_COMMENT, payload: data })
        dispatch(clearErrors())
    } catch (error) {
        console.error(error)
        dispatch({ type: SET_ERRORS, payload: error.response })
    }
}

export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS })
}
