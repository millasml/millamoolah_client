import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import rootReducer from './root_reducer'
import { composeWithDevTools } from 'redux-devtools-extension';
// import userReducer from "./slices/user_slice"

// import { configureStore } from '@reduxjs/toolkit'

const loggerMiddleware = createLogger()

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    ))
  )
}

// export default configureStore({
//   reducer : {
//     user: userReducer,
//   }
// })