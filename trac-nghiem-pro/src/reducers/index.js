import topicReducer from "./topic";
import topicPopularReducer from "./topicPopular";
import userReducer from "./user";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  userReducer,
  topicReducer,
  topicPopularReducer
});

export default allReducers;