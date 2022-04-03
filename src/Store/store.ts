import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { CalculatorReducer } from "../Reducers/Calculator";
import { UserReducer } from "../Reducers/User";

const rootReducers = combineReducers({
  UserReducer,
  CalculatorReducer
})

export const store = createStore(rootReducers, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducers>