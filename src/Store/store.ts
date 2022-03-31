import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { UserReducer } from "../Reducers/User";

const rootReducers = combineReducers({
  UserReducer
})

export const store = createStore(rootReducers, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducers>