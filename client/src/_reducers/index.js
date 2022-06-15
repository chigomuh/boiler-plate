import { combineReducers } from "redux";
import user from "./user_reducer";

// reducer들을 하나의 root reducer로 합쳐줌
const rootReducer = combineReducers({
  user,
});

export default rootReducer;
