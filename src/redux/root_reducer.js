import userReducer from "./slices/user_slice"
import spendingReducer from "./slices/spending_slice"
import savingsReducer from "./slices/savings_slice"


import {combineReducers} from "redux"

const rootReducer = combineReducers({
    user: userReducer,
    spending: spendingReducer,
    savings: savingsReducer
  })

export default rootReducer