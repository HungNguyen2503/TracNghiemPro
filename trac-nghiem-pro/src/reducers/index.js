import topicReducer from "./topic";
import userReducer from "./user";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  userReducer,
  topicReducer
});

export default allReducers;