import { ActionType } from "../action-types";
import { GoogleUser } from "expo-google-app-auth";

interface UserLoginAction {
  type: ActionType.LOGIN;
  payload: {
    userData: GoogleUser;
    accessToken: string;
  };
}

interface UserLogoutAction {
  type: ActionType.LOGOUT;
}

export type Action = UserLoginAction | UserLogoutAction;
