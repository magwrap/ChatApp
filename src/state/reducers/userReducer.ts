import { User } from "@/hooks/useFirebase";
import { ActionType } from "../action-types";
import { Action } from "../actions";

export type UserState = null | {
  userData: User;
  accessToken: string;
};

const initialState: UserState = null;

const userReducer = (
  state: UserState = initialState,
  action: Action
): UserState => {
  switch (action.type) {
    case ActionType.LOGIN:
      return action.payload;
    case ActionType.LOGOUT:
      return null;
    default:
      return state;
  }
};

export default userReducer;
