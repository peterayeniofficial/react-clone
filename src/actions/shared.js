import { getInitialData } from "../utils/api";
import { receiveTweets } from "../actions/tweets";
import { receiveUsers } from "../actions/users";
import { setAuthUser } from "../actions/authUser";
import { showLoading, hideLoading } from "react-redux-loading";

const AUTHED_ID = "tylermcginnis";

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getInitialData().then(({ users, tweets }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveTweets(tweets));
      dispatch(setAuthUser(AUTHED_ID));
      dispatch(hideLoading());
    });
  };
}
