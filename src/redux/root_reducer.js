import userReducer from "./slices/user_slice"
import {combineReducers} from "redux"

const rootReducer = combineReducers({
    user: userReducer,
  })

export default rootReducer