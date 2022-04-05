import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { CalculatorReducer } from "../Reducers/Calculator";

const rootReducers = combineReducers({
  CalculatorReducer
})

export const store = createStore(rootReducers, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducers>