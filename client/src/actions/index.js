import stream from "../api/stream";
import history from "../history";
import {
  SIGN_OUT,
  SIGN_IN,
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  EDIT_STREAM,
} from "./types";
import actions from "redux-form/lib/actions";
import {get} from "lodash";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = (formValue) => async (dispatch, getState) => {
  const {userId} = getState().auth;
  const response = await stream.post("/streams", {...formValue, userId});

  dispatch({type: CREATE_STREAM, payload: response.data});

  history.push("/");
};

export const fetchStreams = () => async (dispatch) => {
  const response = await stream.get("/streams");

  dispatch({type: FETCH_STREAMS, payload: response.data});
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await stream.get(`/streams/${id}`);

  dispatch({type: FETCH_STREAM, payload: response.data});
};

export const editStream = (id, formValue) => async (dispatch) => {
  const response = await stream.patch(`/streams/${id}`, formValue);

  dispatch({type: EDIT_STREAM, payload: response.data});
  history.push("/");
};

export const deleteStream = (id) => async (dispatch) => {
  await stream.delete(`/streams/${id}`);

  dispatch({type: DELETE_STREAM, payload: id});
  history.push("/");
};
