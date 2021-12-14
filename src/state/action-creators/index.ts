import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import { Action } from "../actions";
import { GoogleUser } from "expo-google-app-auth";

export const loginUser = (userData: GoogleUser, accessToken: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.LOGIN,
      payload: {
        userData,
        accessToken,
      },
    });
  };
};

export const logoutUser = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.LOGOUT,
    });
  };
};
