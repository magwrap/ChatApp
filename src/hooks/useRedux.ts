import { actionCreators } from "@/state";
import { State } from "@/state/reducers";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

const useRedux = () => {
  const dispatch = useDispatch();
  const { loginUser, logoutUser } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const user = useSelector((state: State) => state.user);

  return {
    loginUser,
    logoutUser,
    user,
  };
};

export default useRedux;
