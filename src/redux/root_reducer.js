import userReducer from "./slices/user_slice"
import spendingReducer from "./slices/spending_slice"

import {combineReducers} from "redux"

const rootReducer = combineReducers({
    user: userReducer,
    spending: spendingReducer
  })

export default rootReducer