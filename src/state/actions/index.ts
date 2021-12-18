import { ActionType } from "../action-types";
import { User } from "@/hooks/useFirebase";

interface UserLoginAction {
  type: ActionType.LOGIN;
  payload: {
    userData: User;
    accessToken: string;
  };
}

interface UserLogoutAction {
  type: ActionType.LOGOUT;
}

export type Action = UserLoginAction | UserLogoutAction;
