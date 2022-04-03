import { CalculatorReducerActionsType } from "./CalculatorAC"

export type InitialCalculatorStateType = typeof initialState

interface ChangeMode {
  DRAG_MODE: 'DRAG_MODE',
  CALCULATE_MODE: 'CALCULATE_MODE'
}
export enum ChangeModeType {
  DRAG_MODE = 'DRAG_MODE',
  CALCULATE_MODE = 'CALCULATE_MODE',
}

const initialState = {
  stack: '0',
  current: '0',
  mode: ChangeModeType.CALCULATE_MODE
}
let arrSymbols = [
  '/', '*', '-', '+', '.'
]
function checkLastSymbol(value: string) {
  let stringValue = String(value[value.length - 1])
  let status = false
  for (const prop of arrSymbols) {
    if (prop === stringValue) {
      status = true
      break
    }
  }
  return status
}

export const CalculatorReducer = (state: InitialCalculatorStateType = initialState, action: CalculatorReducerActionsType) => {
  switch (action.type) {
    case 'UPDATE-ANSWER':
      let checkCurrentNullValue = (state.current == '0' && action.value != '.') ? action.value : state.current + action.value;
      let checkStackNullValue = (state.stack == '0' && action.value != '.') ? action.value : state.stack + action.value;
      if (!state.stack && !isFinite(+action.value)) { return state }
      if (Number(state.stack) == Infinity || (isNaN(Number(state.stack)) && state.stack !== 'Не определено')) {
        return { ...state, stack: 'Не определено', current: 'Не определено' }
      }
      if (checkLastSymbol(state.stack) && checkLastSymbol(action.value)) return state
      else return { ...state, stack: checkStackNullValue, current: checkCurrentNullValue }
    case 'CLEAR-ANSWER':
      return { ...state, stack: '0', current: '0' }
    case 'UPDATE-CURRENT':
      if (!state.stack && !isFinite(+action.value)) { return state }
      if (checkLastSymbol(state.stack) && checkLastSymbol(action.value)) return state
      else return { ...state, stack: state.stack + action.value, current: '0' }
    case 'CALCULATE-ANSWER':
      let answer = Number(eval(`${state.stack}`).toFixed(2))
      if (!state.stack && !isFinite(+action.value) && Number(state.stack) == 0) { return state }
      return { ...state, stack: answer, current: answer }
    case 'CHANGE-MODE':
      return { ...state, mode: action.value }

    default: return state
  }
}